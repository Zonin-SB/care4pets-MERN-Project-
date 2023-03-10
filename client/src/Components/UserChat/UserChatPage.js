import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import {
  getAllMessages,
  getYourExpertDetails,
  sendMessage,
} from '../../Axios/Services/UserServices';
// import nochat from '../../images/nochat.png'
import { io } from 'socket.io-client';

function UserChatPage() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState('');
  const [chatFrom, setChatFrom] = useState('');
  const [chat, setChat] = useState('');
  const socket = useRef();
  const scrollRef = useRef();
  const [expertDetails, setExpertDetails] = useState([]);
  const userId = useSelector((state) => state.admin.userDetails.userId);

  useEffect(() => {
    // socket.current = io('ws://localhost:3001');
    socket.current = io('/');
    socket.current.on('getMessage', (data) => {
      // setArrivalMessage(data)
      setArrivalMessage({
        _id: data.from,
        messages: {
          message: data.message,
          time: data.time,
        },
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage && setChat((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit('addUser', userId);
  }, [userId]);

  useEffect(() => {
    fetchExpertDetails();
    if (id) {
      fetchMessage();
    }

    async function fetchExpertDetails() {
      const token = localStorage.getItem('userToken');
      const response = await getYourExpertDetails(token, userId);
      setExpertDetails(response.expert[0]);
    }
  }, [userId, id]);

  async function fetchMessage() {
    const token = localStorage.getItem('userToken');
    const data = await getAllMessages(token, id);
    if (data.messages) {
      setChatFrom(data.from);
      setChat(data.messages);
    }
  }

  const sendChat = async () => {
    const token = localStorage.getItem('userToken');
    const currentDate = new Date();
    const time = currentDate.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    socket.current.emit('sendMessage', {
      from: userId,
      to: id,
      message: message,
      time: time,
    });

    await sendMessage(token, id, message).then(() => {
      fetchMessage();
    });

    setMessage('');
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView(false);
  }, [chat]);

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <>
        {/* component */}
        <div className="flex h-screen antialiased text-gray-800 ">
          <div className="flex md:flex-row flex-col h-full w-full overflow-x-hidden">
            <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
              <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <div className="ml-2 font-bold text-2xl">QuickChat</div>
              </div>
              <div className="flex flex-col  items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                <div className="h-20 w-20 rounded-full border overflow-hidden">
                  <img
                    src={expertDetails ? expertDetails.profilePic : ''}
                    alt="Avatar"
                    className="h-full w-full"
                  />
                </div>
                <div className="text-sm font-semibold mt-2">
                  {expertDetails ? expertDetails.name : ''}
                </div>
                <div className="text-xs text-gray-500">
                  {expertDetails ? expertDetails.expertisedIn : ''} Expert
                </div>
                <div className="flex flex-row items-center mt-3">
                  <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                    <div className="h-3 w-3 bg-white rounded-full self-end mr-1" />
                  </div>
                  <div className="leading-none ml-1 text-xs">Active</div>
                </div>
              </div>
              {/* <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">Active Conversations</span>
            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
              4
            </span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                H
              </div>
              <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
            </button>
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                M
              </div>
              <div className="ml-2 text-sm font-semibold">Marta Curtis</div>
              <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                2
              </div>
            </button>
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full">
                P
              </div>
              <div className="ml-2 text-sm font-semibold">Philip Tucker</div>
            </button>
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full">
                C
              </div>
              <div className="ml-2 text-sm font-semibold">Christine Reid</div>
            </button>
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full">
                J
              </div>
              <div className="ml-2 text-sm font-semibold">Jerry Guzman</div>
            </button>
          </div>
          <div className="flex flex-row items-center justify-between text-xs mt-6">
            <span className="font-bold">Archivied</span>
            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
              7
            </span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2">
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                H
              </div>
              <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
            </button>
          </div>
        </div> */}
            </div>

            <div className="flex flex-col flex-auto h-full  p-6">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                      {/* <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div>Hey How are you today?</div>
                    </div>
                  </div>
                </div> */}
                      {/* <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Vel ipsa commodi illum saepe numquam maxime
                        asperiores voluptate sit, minima perspiciatis.
                      </div>
                    </div>
                  </div>
                </div> */}
                      {/* <div className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                      <div>I'm ok what about you?</div>
                    </div>
                  </div>
                </div>
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                      <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                      </div>
                    </div>
                  </div>
                </div> */}
                      {/* <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div>Lorem ipsum dolor sit amet !</div>
                    </div>
                  </div>
                </div> */}

                      {chat ? (
                        chat.map((data, index) => {
                          if (data._id === chatFrom) {
                            return (
                              <div
                                key={index}
                                className="col-start-6 col-end-13 p-3 rounded-lg"
                              >
                                <div className="flex items-center justify-start flex-row-reverse">
                                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"></div>
                                  <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                    <div>{data.messages.message}</div>
                                    <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 whitespace-nowrap text-gray-500">
                                      {data.messages.time}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <div
                                key={index}
                                className="col-start-1 col-end-8 p-3 rounded-lg"
                              >
                                <div className="flex flex-row items-center">
                                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                    {/* <img src={expertDetails?expertDetails.profilePic:''} alt="" /> */}
                                  </div>
                                  <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <div>{data.messages.message}</div>
                                    <div className="absolute text-xs bottom-0 left-0 -mb-5 mr-2 whitespace-nowrap text-gray-500">
                                      {data.messages.time}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })
                      ) : (
                        <div>
                          {/* <img src={nochat} alt="no chats found" /> */}
                        </div>
                      )}

                      {/* <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div className="flex flex-row items-center">
                        <button className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                        <div className="flex flex-row items-center space-x-px ml-4">
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-4 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-12 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-6 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-5 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-4 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-3 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-1 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-1 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-4 w-1 bg-gray-500 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                      <div ref={scrollRef}></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                  <div></div>
                  <div className="flex-grow ml-4">
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                        placeholder="Type a message"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={sendChat}
                      className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                      <span>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default UserChatPage;
