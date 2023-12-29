import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Animated,
} from 'react-native';
import ReplyItem from './replyItem';

const CommentItem = ({comment}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState('');
  const [replies, setReplies] = useState(comment.replies || []);
  const [mentionTarget, setMentionTarget] = useState(null);
  const [fadeIn] = useState(new Animated.Value(0));
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [comment]);

  const handleReply = () => {
    setReplies([
      ...replies,
      {id: replies.length + 1, name: 'User', body: newReply},
    ]);
    setNewReply('');
    setShowReplies(false);
    setMentionTarget(null);
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleMentionInReply = mentionTarget => {
    setMentionTarget(mentionTarget);
  };

  const handleLike = () => {
    setLikes(likes + (isLiked ? -1 : 1));
    setIsLiked(!isLiked);
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeIn}]}>
      <View style={styles.commentInfo}>
        <Image style={styles.image} source={require('../assets/person.jpg')} />
        <View style={styles.singleComment}>
          <Text style={styles.name}>{comment.name}</Text>
          <Text style={styles.comment}>{comment.body}</Text>
        </View>
      </View>
      <View style={styles.commentContainer}>
        <Text>7h</Text>
        <TouchableOpacity onPress={handleLike}>
          <Text>{isLiked ? 'Unlike' : 'Like'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleReplies}>
          <Text>Reply</Text>
        </TouchableOpacity>
      </View>

      {showReplies && replies.length > 0 && (
        <View style={styles.repliesContainer}>
          {replies.map((reply, index) => (
            <ReplyItem
              key={index}
              reply={reply}
              onMention={handleMentionInReply}
            />
          ))}
        </View>
      )}

      {showReplies && (
        <View style={styles.replyInputContainer}>
          <View style={styles.border}>
            <View style={styles.mentionContainer}>
              <Text style={styles.mention}>
                {mentionTarget ? `@${mentionTarget}` : ''}
              </Text>
            </View>
            <TextInput
              style={styles.replyInput}
              placeholder="Type your reply..."
              value={newReply}
              onChangeText={text => setNewReply(text)}
            />
          </View>
          <TouchableOpacity onPress={handleReply}>
            <Button
              title="Comment"
              color="#0000FF"
              onPress={handleReply}
              accessibilityLabel="Comment Button"
            />
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: 5,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 35,
    marginRight: 12,
  },
  name: {
    fontSize: 12,
    marginBottom: 3,
    marginTop: 5,
    marginHorizontal: 10,
    fontWeight: '900',
  },
  comment: {
    fontSize: 13,
    marginVertical: 3,
    marginHorizontal: 10,
    fontWeight: '600',
  },
  commentContainer: {
    flexDirection: 'row',
    width: '50%',
    marginVertical: 2,
    justifyContent: 'space-around',
    marginHorizontal: 35,
  },
  commentInfo: {
    flexDirection: 'row',
  },
  repliesContainer: {
    marginLeft: 50,
  },
  border: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginVertical: 15,
    marginHorizontal: 15,
  },
  replyInput: {
    flex: 1,
    borderRadius: 5,
    marginRight: 5,
    paddingHorizontal: 8,
  },
  mentionContainer: {
    justifyContent: 'flex-end',
  },
  mention: {
    fontSize: 13,
    fontWeight: '600',
    marginRight: 1,
  },
  singleComment: {
    width: '75%',
    borderColor: '#000',
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
  },
  likeContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
});

export default CommentItem;
