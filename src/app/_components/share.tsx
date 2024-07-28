'use client';

import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share';

export const Share = () => {
  return (
    <div>
      <p className='font-bold text-2xl text-center my-2'>Please share!</p>
      <div className='flex gap-4 justify-center'>
        <TwitterShareButton
          url={'https://www.valorant-oekaki-chat.net/'}
          title={'You can make ASCII art of VALORANT on this website!'}
          hashtags={['VALORANT', 'ValorantOekakiChat', 'VALORANT募集']}
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <RedditShareButton
          url={'https://www.valorant-oekaki-chat.net/'}
          title={'You can make ASCII art of VALORANT on this website!'}
        >
          <RedditIcon size={40} round />
        </RedditShareButton>
        <FacebookShareButton
          url={'https://www.valorant-oekaki-chat.net/'}
          quote={'You can make ASCII art of VALORANT on this website!'}
          hashtag={'VALORANT'}
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <TelegramShareButton
          url={'https://www.valorant-oekaki-chat.net/'}
          title={'You can make ASCII art of VALORANT on this website!'}
        >
          <TelegramIcon size={40} round />
        </TelegramShareButton>
        <WeiboShareButton
          url={'https://www.valorant-oekaki-chat.net/'}
          title={'You can make ASCII art of VALORANT on this website!'}
        >
          <WeiboIcon size={40} round />
        </WeiboShareButton>
        <WhatsappShareButton
          url={'https://www.valorant-oekaki-chat.net/'}
          title={'You can make ASCII art of VALORANT on this website!'}
          separator=':: '
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};
