'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import {
  faBadgeCheck,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faHeart as falHeart,
  faComment,
  faPaperPlane,
  faBookmark as falBookmark,
} from '@fortawesome/pro-light-svg-icons';
// import { getPlaiceholder } from 'plaiceholder';
import CommentForm from '../forms/CommentForm/CommentForm';

const InstagramCard = () => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(87267);

  useEffect(() => {
    if (liked) {
      setLikes((currentlikes) => currentlikes + 1);
    } else {
      setLikes((currentlikes) => currentlikes - 1);
    }
  }, [liked]);

  const heartIconClass = classNames('cursor-pointer', {
    'text-red-500': liked,
    'text-black': !liked,
  });

  return (
    <div className="bg-white rounded border border-gray-200">
      <header className="flex items-center p-4">
        <div className="w-8 h-8 mr-2 rounded-full relative overflow-hidden">
          <Image
            src="/images/ezeikel.png"
            alt="avatar"
            fill
            className="object-cover object-top"
            priority
            // placeholder="blur"
            sizes="32px"
          />
        </div>
        <div>
          <span className="flex flex-row items-center font-medium text-sm">
            ezeikel
            <FontAwesomeIcon
              icon={faBadgeCheck}
              size="sm"
              className="ml-1 text-navy-blue"
            />
          </span>
          <span className="flex flex-row text-xs">
            <a
              href="http://www.eggslut.com/"
              target="_blank"
              rel="noreferrer"
              className="text-black leading-3"
            >
              Eggslut
            </a>
          </span>
        </div>
      </header>
      <section className="relative h-80 w-full">
        <Image
          src="/images/eggslut.jpg"
          alt="ezeikel"
          fill
          className="object-cover object-top"
          quality={100}
          priority
          // placeholder="blur" // TODO: https://plaiceholder.co/usage#base64
        />
      </section>
      <footer className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <FontAwesomeIcon
              icon={liked ? fasHeart : falHeart}
              size="lg"
              onClick={() => setLiked((currentLiked) => !currentLiked)}
              className={heartIconClass}
            />
            <FontAwesomeIcon
              icon={faComment}
              size="lg"
              className="cursor-pointer ml-4 text-black"
            />
            <FontAwesomeIcon
              icon={faPaperPlane}
              size="lg"
              className="cursor-pointer ml-4 text-black"
            />
          </div>
          <FontAwesomeIcon
            icon={bookmarked ? fasBookmark : falBookmark}
            size="lg"
            onClick={() =>
              setBookmarked((currentBookmarked) => !currentBookmarked)
            }
            className="cursor-pointer text-black"
          />
        </div>
        <div>
          <div className="text-sm mb-2 font-medium">{likes} likes</div>
          <div className="text-sm mb-2">
            <span className="font-medium">ezeikel</span>
            <span className="ml-2">
              Literally the best Front End Developer ever.
            </span>
          </div>
          <div className="text-sm">
            <div>
              <span className="text-medium">apple</span>
              <span className="ml-2">We need to hire this guy!</span>
            </div>
            <div className="text-sm mt-2">
              <span className="text-medium">facebook</span>
              <span className="ml-2">
                Move over{' '}
                <span className="cursor-pointer font-normal text-navy-blue">
                  @apple
                </span>
              </span>
            </div>
          </div>
        </div>
      </footer>
      <CommentForm />
    </div>
  );
};

export default InstagramCard;
