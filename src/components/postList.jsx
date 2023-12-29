import React from 'react';
import {View, FlatList} from 'react-native';
import PostItem from './postItem';

const PostList = ({posts}) => {
  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <PostItem post={item} />}
      />
    </View>
  );
};

export default PostList;
