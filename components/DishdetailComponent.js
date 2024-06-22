import React, { Component } from "react";
import { View, Text, FlatList, Button, Modal, PanResponder, Alert  } from "react-native";
import { Card, Image, Rating, Icon ,Input} from "react-native-elements";
import { ScrollView } from 'react-native-virtualized-view';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { postFavorite ,postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

class ModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 3,
      author: '',
      comment: ''
    };
  }
  render() {
    return (
      <View style={{ justifyContent: 'center', margin: 20 }}>
        <Rating startingValue={this.state.rating} showRating={true}
          onFinishRating={(value) => this.setState({ rating: value })} />
        <View style={{ height: 20 }} />
        <Input value={this.state.author} placeholder='Author' leftIcon={{ name: 'user-o', type: 'font-awesome' }}
          onChangeText={(text) => this.setState({ author: text })} />
        <Input value={this.state.comment} placeholder='Comment' leftIcon={{ name: 'comment-o', type: 'font-awesome' }}
          onChangeText={(text) => this.setState({ comment: text })} />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button title='SUBMIT' color='#7cc'
            onPress={() => this.handleSubmit()} />
          <View style={{ width: 10 }} />
          <Button title='CANCEL' color='#ccc'
            onPress={() => this.props.onPressCancel()} />
        </View>
      </View>
    );
  }
  handleSubmit() {
    this.props.postComment(this.props.bookId, this.state.rating, this.state.author, this.state.comment);
    this.props.onPressCancel();
  }
}

class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <FlatList data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={(item) => item.id.toString()} />
      </Card>
    );
  }
  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        {/* <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text> */}
        <Rating startingValue={item.rating} imageSize={16} readonly style={{ flexDirection: 'row' }} />
        <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
      </View>
    );
  };
}

class RenderDish extends Component {
  render() {
    // gesture
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
      if (dx < -200) return 1; // right to left
      return 0;
    };
    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
      if (dx > 200) return 2; // left to right
      return 0;
    };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => { return true; },
      onPanResponderEnd: (e, gestureState) => {
        if (recognizeDrag(gestureState) === 1) {
          Alert.alert(
            'Add Favorite',
            'Are you sure you wish to add ' + book.name + ' to favorite?',
            [
              { text: 'Cancel', onPress: () => { /* nothing */ } },
              { text: 'OK', onPress: () => { this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite() } },
            ]
          );
        }
        if (recognizeComment(gestureState) === 2) {
          this.props.onPressComment()
        }
        return true;
      }
    });
    // render
    const book = this.props.book;
    if (book != null) {
      return (
        <Card {...panResponder.panHandlers}>
         <Image source={{ uri: baseUrl + book.image }}
            style={{
              width: "100%",
              height: 100,
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.FeaturedTitle>{book.name}</Card.FeaturedTitle>
          </Image>
          <Text style={{ margin: 10 }}>{book.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Icon raised reverse name={this.props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'
            onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
          <Icon raised reverse name='pencil' type='font-awesome' color='#7cc'
            onPress={() => this.props.onPressComment()} />
         </View>
        </Card>
      );
    }
    return <View />;
  }
}

// redux

const mapStateToProps = (state) => {
  return {
    books: state.books,
    comments: state.comments,
    favorites: state.favorites
  }
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (bookId) => dispatch(postFavorite(bookId)),
  postComment: (bookId, rating, author, comment) => dispatch(postComment(bookId, rating, author, comment))
});

class Dishdetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showModal: false
      };
    }
    render() {
      const bookId = parseInt(this.props.route.params.bookId);
      const book = this.props.books.books[bookId];
      const comments = this.props.comments.comments.filter((cmt) => cmt.bookId === bookId);
      const favorite = this.props.favorites.some((el) => el === bookId);
      return (
        <ScrollView>
          <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
          <RenderDish book={book} favorite={favorite} onPressFavorite={() => this.markFavorite(bookId)} onPressComment={() => this.setState({ showModal: true })}  />
          </Animatable.View>
          <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
          <RenderComments comments={comments} />
          </Animatable.View>
          <Modal animationType={'slide'} visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <ModalContent bookId={bookId}
            onPressCancel={() => this.setState({ showModal: false })} 
            postComment={this.props.postComment}/>
        </Modal>
        </ScrollView>
      );
    }
    markFavorite(bookId) {
      this.props.postFavorite(bookId);
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);