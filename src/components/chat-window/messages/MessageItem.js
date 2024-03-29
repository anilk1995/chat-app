import TimeAgo from "timeago-react";
import ProfileAvatar from "../../ProfileAvatar";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";
import PresenceDot from "../../PresenceDot";
import { Button, Tooltip, Whisper } from "rsuite";
import { useCurrentRoom } from "../../../context/currentRoomContext";
import { memo } from "react";
import { auth } from "../../../misc/firebase";
import { useHover } from "../../../misc/custom-hooks";
import IconBtnControl from "./IconBtnControl";
import CloseIcon from "@rsuite/icons/Close";
import ImgBtnModal from "./ImgBtnModal";

const renderFileMessage = (file) => {
  if (file.contentType.includes("image")) {
    return (
      <div className="height-220">
        <ImgBtnModal src={file.url} fileName={file.name} />
      </div>
    );
  }

  if (file.contentType.includes("audio")) {
    return (
      <audio controls>
        <source src={file.url} type="audio/mp3" />
        Browser does not support
      </audio>
    );
  }
  return <a href={file.url}>Download {file.name}</a>;
};

function MessageItem({ message, handleAdmin, handleLike, handleDelete }) {
  const { author, createdAt, text, likes, likeCount, file } = message;
  const [selfRef, isHovered] = useHover();

  const isAdmin = useCurrentRoom((v) => v.isAdmin);
  const admins = useCurrentRoom((v) => v.admins);
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);
  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHovered ? "bg-black-02" : ""}`}
      ref={selfRef}
    >
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />
        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        >
          {canGrantAdmin && (
            <Button
              block
              appearance="primary"
              onClick={() => {
                handleAdmin(author.uid);
              }}
            >
              {isMsgAuthorAdmin
                ? "Remove admin permission"
                : "Give admin in this room"}
            </Button>
          )}
        </ProfileInfoBtnModal>
        <TimeAgo
          dateTime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
        <IconBtnControl
          {...(isLiked ? { color: "red" } : {})}
          isVisible
          iconName="heart"
          tooltip="Like this message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />
        {isAuthor && (
          <Whisper speaker={<Tooltip> Delete this message</Tooltip>}>
            <span>
              <CloseIcon onClick={() => handleDelete(message.id, file)} />
            </span>
          </Whisper>
        )}
      </div>
      <div>
        {text && <span className="word-breal-all">{text}</span>}
        {file && renderFileMessage(file)}
      </div>
    </li>
  );
}

export default memo(MessageItem);
