import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import CommentItem from './commentItem';
import ListItem from './listItem';

const PostItem = ({post}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleComment = () => {
    setComments([
      ...comments,
      {id: comments.length + 1, name: 'User', body: newComment, replies: []},
    ]);
    setNewComment('');
  };

  const handleReply = (commentIndex, reply) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies.push({
      id: updatedComments[commentIndex].replies.length + 1,
      name: 'User',
      body: reply,
    });
    setComments(updatedComments);
  };

  const toggleCommentModal = () => {
    setCommentModalVisible(!isCommentModalVisible);
  };

  const handleLike = () => {
    setLikes(likes + (isLiked ? -1 : 1));
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.post}>
      <ListItem
        image={require('../assets/person.jpg')}
        title="Soe Sandar Win"
        subTitle="27hours ago"
      />
      <Text style={styles.postBody}>{post.body}</Text>

      <View style={styles.imageContainer}>
        <Image source={require('../assets/view.jpg')} style={styles.image} />
        <Image source={require('../assets/boat.jpg')} style={styles.image} />
        <Image source={require('../assets/car.jpg')} style={styles.image} />
        <Image
          source={require('../assets/trekking.jpg')}
          style={styles.image}
        />
      </View>

      <View style={styles.commentContainer}>
        <TouchableOpacity onPress={handleLike}>
          <Text>{isLiked ? 'Unlike' : 'Like'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCommentModal}>
          <Text>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('it is share')}>
          <Text>Share</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isCommentModalVisible}
        onRequestClose={toggleCommentModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={toggleCommentModal}>
            <Text></Text>
          </TouchableOpacity>

          <FlatList
            data={comments}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <CommentItem
                comment={item}
                onReply={reply => handleReply(index, reply)}
              />
            )}
          />

          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Type your comment..."
              value={newComment}
              onChangeText={text => setNewComment(text)}
            />
            <TouchableOpacity onPress={handleComment}>
              <Button
                title="Comment"
                onPress={handleComment}
                color="#0000FF"
                accessibilityLabel="Comment Button"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    backgroundColor: '#fff',
    flex: 1,
    height: 'auto',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    padding: 10,
  },
  postBody: {
    marginVertical: 10,
    fontSize: 15,
    fontWeight: '400',
  },
  image: {
    width: 160,
    height: 150,
    borderRadius: 10,
    marginRight: 5,
    marginVertical: 2,
  },
  imageContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  commentContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 5,
    paddingHorizontal: 8,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  closeButton: {
    alignItems: 'center',
    marginBottom: 10,
  },
  likeContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
});

export default PostItem;
