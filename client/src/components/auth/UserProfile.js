import React from 'react';
import './UserProfile.css';
import { Button, Container, Form } from 'react-bootstrap';


function UserProfile() {
    return (
        <Container className="container-user">
            <h3 className="text-center mt-5 mb-3 ">YOUR ACCOUNT SETTINGS</h3>
            <div className="title-border mb-4">
                <span></span>
            </div>
            <div className="userform">
                <Form className="">
                    <Form.Group controlId="Name" >
                        <Form.Label><b>Name</b></Form.Label>
                        <Form.Control className="user-inputFiled" type="name" placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" >
                        <Form.Label><b>Email address</b></Form.Label>
                        <Form.Control className="user-inputFiled mb-4" type="email" placeholder="Enter email" />
                    </Form.Group>
                    {/* <p><b>Choose Photo</b></p> */}
                    <div className="row">
                        <div className="col-6">
                            <img src="/profile.jpg" className="profilephoto" alt=""></img>
                            <input type="file" className="photo  " accept='image/*'></input>
                            <label className="photolabel">Choose new photo</label>

                        </div>
                        <div className="col-6">
                            <Button className=" savesetting setting mt-4">Save settings</Button>
                        </div>
                    </div>
                </Form>
                <hr ></hr>
                <h3 className="text-center mt-5 mb-3">PASSWORD CHANGE</h3>
                <div className="title-border mb-4">
                    <span></span>
                </div>
                <Form className="">
                    <Form.Group controlId="currentpassword" >
                        <Form.Label><b>Current password</b></Form.Label>
                        <Form.Control className="user-inputFiled " type="password" placeholder="••••••••" />
                    </Form.Group>
                    <Form.Group controlId="newPassword" >
                        <Form.Label><b>New password</b></Form.Label>
                        <Form.Control className="user-inputFiled" type="password" placeholder="••••••••" />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword" >
                        <Form.Label><b>Confirm password</b></Form.Label>
                        <Form.Control className="user-inputFiled" type="password" placeholder="••••••••" />
                    </Form.Group>
                    <div className="text-center">
                        <Button className="savepassword setting mt-2 " >Save password</Button>
                    </div>


                </Form>
            </div>


        </Container>
    )
}
export default UserProfile;