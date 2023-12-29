import React from 'react';
import {View} from 'react-native';
import PostList from './postList';

const MainScreen = () => {
  const posts = [
    {
      id: 1,
      body: 'This is the first post.let ta This is the first post.let  This is the first post.let lks about job opportunites and other stuff.',
      comments: [
        {
          id: 1,
          name: 'User1',
          body: 'Comment 1',
        },
        {
          id: 2,
          name: 'User2',
          body: 'Comment 2',
        },
      ],
    },
  ];

  return (
    <View>
      <PostList posts={posts} />
    </View>
  );
};

export default MainScreen;
