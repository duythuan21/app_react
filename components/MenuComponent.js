import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
};

class Menu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.books.isLoading) {
      return (<Loading />);
    } else if (this.props.books.errMess) {
      return (<Text>{this.props.errMess}</Text>);
    } else {
    return (
        <FlatList
          data={this.props.books.books}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />
    );
  }
}
  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;
    return (
    <Animatable.View animation='fadeInRightBig' duration={2000}>  
      <ListItem key={index} onPress={() => navigate('Dishdetail', { bookId: item.id })}>
         <Avatar source={{uri: baseUrl + item.image}} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </Animatable.View>  
    );
  }
}

export default connect(mapStateToProps)(Menu);