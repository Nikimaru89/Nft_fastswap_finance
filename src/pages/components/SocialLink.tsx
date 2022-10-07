import React from 'react';
import styled, { css } from 'styled-components';

const InputField = styled.input`
  font-family: 'CircularStd';
  font-weight: 500;
  font-size: 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: white;
  background-position: 20px 10px; 
  background-repeat: no-repeat;
  padding: 10px 55px;
  width:100%;
  ${(props: { mode?: any }) => {
    switch (props.mode) {
      case "website":
        return css`
          background-image:url('assets/socials/website.svg');
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          background-position: 20px 14px; 
        `;
      case "twitter":
        return css`
          background-image:url('assets/socials/twitter.svg');
        `;
      case "discord":
        return css`
          background-image:url('assets/socials/discord.svg');
        `;
      case "instagram":
        return css`
          background-image:url('assets/socials/instagram.svg');
        `;
      case "medium":
        return css`
          background-image:url('assets/socials/medium.svg');
        `;
      case "telegram":
        return css`
          background-image:url('assets/socials/telegram.svg');
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        `;
    }
  }}
  @media(max-width:400px){
    font-size:12px;
    padding:15px 55px;
  }
`

const SocialLink = ({ info, setInfo }: any) => {
  return (
    <div>
      <InputField placeholder="Your Website URL" mode="website" value={info.website}
        onChange={e => setInfo({ ...info, website: e.target.value })} />
      <InputField placeholder="Your Twitter Handle" mode="twitter" value={info.twitter}
        onChange={e => setInfo({ ...info, twitter: e.target.value })} />
      <InputField placeholder="Your Discord Handle" mode="discord" value={info.discord}
        onChange={e => setInfo({ ...info, discord: e.target.value })} />
      <InputField placeholder="Your Instagram Handle" mode="instagram" value={info.instagram}
        onChange={e => setInfo({ ...info, instagram: e.target.value })} />
      <InputField placeholder="Your Medium Handle" mode="medium" value={info.medium}
        onChange={e => setInfo({ ...info, medium: e.target.value })} />
      <InputField placeholder="Your Telegram Handle" mode="telegram" value={info.telegram}
        onChange={e => setInfo({ ...info, telegram: e.target.value })} />
    </div>
  );
}
export default SocialLink;