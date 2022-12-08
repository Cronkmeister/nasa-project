import { Footer as ArwesFooter, Paragraph } from "arwes";
import Centered from "./Centered";

const Footer = () => {
  return (
    <ArwesFooter animate>
      <Centered>
        <Paragraph
          style={{ fontSize: 14, margin: "10px 0", textAlign: "center" }}
        >
          This is not an official site and is not affiliated with NASA or SpaceX
          in any way.
        </Paragraph>
      </Centered>
    </ArwesFooter>
  );
};

export default Footer;
