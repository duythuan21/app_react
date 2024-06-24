import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {
  render() {
    return (
      <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
      <Card>
        <Card.Title>Thông Tin Liên Hệ</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 10 }}>121, Clear Water Bay Road</Text>
        <Text style={{ margin: 10 }}>Clear Water Bay, Kowloon</Text>
        <Text style={{ margin: 10 }}>Viet Nam</Text>
        <Text style={{ margin: 10 }}>Tel: +8496 330 13073</Text>
        <Text style={{ margin: 10 }}>Fax: +852 8765 4321</Text>
        <Text style={{ margin: 10 }}>Email: thuan.pnd@gmail.com</Text>
        <Button title=' Compose Email' buttonStyle={{ backgroundColor: '#7cc' }}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.composeMail} />
      </Card>
      </Animatable.View>
    );
  }
  composeMail() {
    MailComposer.composeAsync({
      recipients: ['<son.tranghong@hoasen.edu.vn>'],
      subject: 'From Confusion',
      body: 'Hello my friends ...'
    });
  }
}
export default Contact;