import classNames from "classnames";
import Bold from "./icons/bold.svg";
import Italic from "./icons/italic.svg";
import Underline from "./icons/underline.svg";
import Image from "./icons/image.svg";
var INLINE_STYLES = [
  { style: "BOLD", icon: "bold" },
  { style: "ITALIC", icon: "italic" },
  { style: "UNDERLINE", icon: "underline" },
];
export const StyleButton = ({ active, className, onClick, style, icon }) => {
  return (
    <span
      className={classNames(
        "toolbar__button",
        active && "toolbar__button--active",
        className,
        "icon",
        icon
      )}
      onMouseDown={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick("text", style);
        }
      }}
    ></span>
  );
};
const ImageButton = ({ active, className, onClick, style, icon }) => {
  return (
    <span
      className={classNames(
        "toolbar__button",
        active && "toolbar__button--active",
        className,
        "icon",
        "image"
      )}
      onClick={(e) => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = () => {
          const formData = new FormData();
          const file = input.files[0];
          formData.append("image", file);
          onClick("image", URL.createObjectURL(file));
        };
      }}
    ></span>
  );
};
export const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="toolbar__controls">
      {INLINE_STYLES.map((type, index) => (
        <StyleButton
          key={index}
          active={currentStyle.has(type.style)}
          onClick={onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
      <ImageButton onClick={onToggle} />
    </div>
  );
};
