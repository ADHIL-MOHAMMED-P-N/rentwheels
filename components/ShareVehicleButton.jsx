import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  WhatsappIcon,
} from "react-share";
const ShareVehicleButton = ({ vehicle }) => {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/vehicles/${vehicle._id}`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Vehicle:
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={url}
          quote={vehicle.name}
          hashtag={
            `#${vehicle.type.replace(
              /\s/g,
              ""
            )}ForRent` /* regular expression for replacing space with emptystring */
          }
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          title={vehicle.name}
          hashtags={[`${vehicle.type.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={url} title={vehicle.name} separator=":: ">
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={url}
          subject={vehicle.name}
          body={`Vehicle For rent: ${url}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareVehicleButton;
