import React, { Component } from 'react';
import { Text, FlatList,  } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
//import { LEADERS } from '../shared/leaders';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

class RenderHistory extends Component {
  render() {
    return (
      <Card>
        <Card.Title>Lịch sử sử thư viện chúng tôi</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 10 }}>Thư viện của chúng tôi là một kho tàng tri thức phong phú, nơi cung cấp một môi trường học tập và nghiên cứu tối ưu cho cộng đồng. Với hơn 50.000 đầu sách thuộc nhiều lĩnh vực khác nhau, từ khoa học, công nghệ đến văn học và nghệ thuật, thư viện mang đến nguồn tài nguyên vô tận cho người đọc. Đặc biệt, thư viện còn sở hữu một bộ sưu tập tài liệu số hóa, cho phép truy cập từ xa, giúp việc học tập trở nên thuận tiện và hiệu quả hơn bao giờ hết.</Text>
        <Text style={{ margin: 10 }}>Không chỉ là nơi lưu giữ và cung cấp tài liệu, thư viện của chúng tôi còn là một không gian giao lưu văn hóa và tri thức. Các hoạt động như hội thảo, tọa đàm, và các câu lạc bộ đọc sách thường xuyên được tổ chức, tạo điều kiện cho cộng đồng trao đổi, học hỏi và phát triển. Với đội ngũ nhân viên nhiệt tình, chuyên nghiệp, thư viện luôn sẵn sàng hỗ trợ và đáp ứng mọi nhu cầu của người sử dụng, từ việc tìm kiếm tài liệu đến tư vấn nghiên cứu.</Text>
      </Card>
    );
  }
}

class RenderLeadership extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <Loading />
        </Card>
      );
    } else if (this.props.errMess) {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <Text>{this.props.errMess}</Text>
        </Card>
      );
    } else {
    return (
      <Card>
        <Card.Title>Corporate Leadership</Card.Title>
        <Card.Divider />
        <FlatList data={this.props.leaders}
          renderItem={({ item, index }) => this.renderLeaderItem(item, index)}
          keyExtractor={(item) => item.id.toString()} />
      </Card>
    );
  }
}
  renderLeaderItem(item, index) {
    return (
      <ListItem key={index}>
         <Avatar rounded source={{ uri: baseUrl + item.image }} />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: 'bold' }}>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }
}

import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    leaders: state.leaders
  }
};

class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView>
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
          <RenderHistory />
        </Animatable.View>
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
        <RenderLeadership
      leaders={this.props.leaders.leaders}
      isLoading={this.props.leaders.isLoading}
      errMess={this.props.leaders.errMess} />
       </Animatable.View>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(About);