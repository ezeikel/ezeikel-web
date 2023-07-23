import Image from 'next/image';
import type { TweetComponents } from 'react-tweet';

const components: TweetComponents = {
  // eslint-disable-next-line react/jsx-props-no-spreading
  AvatarImg: (props) => <Image {...props} />,
  // eslint-disable-next-line react/jsx-props-no-spreading
  MediaImg: (props) => <Image {...props} fill unoptimized />,
};

export default components;
