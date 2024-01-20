import Image from 'next/image';
import type { TweetComponents } from 'react-tweet';

const components: TweetComponents = {
  AvatarImg: (props) => (
    <Image
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      style={{
        // FIX: @tailwindcss/typography plugin adds a margin to the image
        margin: 0,
      }}
    />
  ),
  // eslint-disable-next-line react/jsx-props-no-spreading
  MediaImg: (props) => <Image {...props} fill unoptimized />,
};

export default components;
