import * as React from 'react';
import axios from 'axios';
import {FormEvent, SyntheticEvent} from "react";


const formStyle = {
  display: 'flex',
  fontSize: '1.5rem',
  justifyContent: 'center',
  flexDirection: 'column',
};

class RoomJoinForm extends React.Component {
  constructor() {
    super();
    this.state = {
      roomname: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // https://stackoverflow.com/questions/42081549
  handleChange(event: React.SyntheticEvent<FormEvent<HTMLInputElement>>): void {
    let target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event: React.SyntheticEvent<FormEvent<HTMLInputElement>>) {
    event.preventDefault();
    axios({
      method: 'get',
      url: `http://${window.location.hostname}:3030/rooms?name=${this.state.roomname}`, // TODO
      timeout: 5000,
      responseType: 'json',
    })
    .then((roomData) => {
      if (roomData.data.total !== 0) { window.location.href += `room/${this.state.roomname}`; }
    })
    .catch(err => console.error(err));
  }

  // loginError() {} TODO

  render() {
    return (
      <form
        style={formStyle}
        onSubmit={this.handleSubmit}
        encType="application/json"
      >
        <label htmlFor="roomname">Room Name</label>
        <input
          type="text"
          name="roomname"
          value={this.state.roomname}
          onChange={this.handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default RoomJoinForm;
