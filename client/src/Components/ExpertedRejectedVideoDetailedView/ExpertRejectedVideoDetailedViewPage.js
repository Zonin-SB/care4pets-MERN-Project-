import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  expertVideoRejected,
  getRejectedVideoDetails,
} from '../../Axios/Services/ExpertServices';

function ExpertRejectedVideoDetailedViewPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [video, setVideo] = useState([]);
  const [message, setMessage] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchVideo();

    async function fetchVideo() {
      const token = localStorage.getItem('expertToken');
      const data = await getRejectedVideoDetails(token, id);
      setVideo(data.videoDetails[0]);
      setMessage(data.videoDetails[0].videoRejected[0]);
    }
  }, [id]);

  async function expertVidRejected() {
    const token = localStorage.getItem('expertToken');
    const data = await expertVideoRejected(token, id);
    if (data.status === 'ok') {
      navigate('/expertRejectedVideos');
    } else {
      setError('Something went wrong....try again after some time...');
    }
  }
  return (
    <div className="mt-9 max-w-screen-2xl mx-auto">
      <>
        {/* component */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n\n\nbody.font-nunito{\n  font-family: Nunito Sans, san-serif;\n}\n',
          }}
        />
        {/* card container */}
        <div className="container px-4 sm:px-8 mx-auto max-w-lg">
          {/* card wrapper */}
          <div className="wrapper bg-white rounded-sm shadow-lg">
            <div className="card px-8 py-4">
              <div className="card-image mt-10 mb-6">
                <svg
                  className="w-10 h-10 text-orange-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width={512}
                  height="512.002"
                  viewBox="0 0 512 512.002"
                >
                  <g transform="translate(0 0.002)">
                    <path
                      d="M64,257.6,227.9,376a47.72,47.72,0,0,0,56.2,0L448,257.6V96a32,32,0,0,0-32-32H96A32,32,0,0,0,64,96ZM160,160a16,16,0,0,1,16-16H336a16,16,0,0,1,16,16v16a16,16,0,0,1-16,16H176a16,16,0,0,1-16-16Zm0,80a16,16,0,0,1,16-16H336a16,16,0,0,1,16,16v16a16,16,0,0,1-16,16H176a16,16,0,0,1-16-16Z"
                      opacity="0.4"
                    />
                    <path d="M352,160a16,16,0,0,0-16-16H176a16,16,0,0,0-16,16v16a16,16,0,0,0,16,16H336a16,16,0,0,0,16-16Zm-16,64H176a16,16,0,0,0-16,16v16a16,16,0,0,0,16,16H336a16,16,0,0,0,16-16V240A16,16,0,0,0,336,224ZM329.4,41.4C312.6,29.2,279.2-.3,256,0c-23.2-.3-56.6,29.2-73.4,41.4L152,64H360ZM64,129c-23.9,17.7-42.7,31.6-45.6,34A48,48,0,0,0,0,200.7v10.7l64,46.2Zm429.6,34c-2.9-2.3-21.7-16.3-45.6-33.9V257.6l64-46.2V200.7A48,48,0,0,0,493.6,163ZM256,417.1a79.989,79.989,0,0,1-46.888-15.192L0,250.9V464a48,48,0,0,0,48,48H464a48,48,0,0,0,48-48V250.9l-209.1,151A80,80,0,0,1,256,417.1Z" />
                  </g>
                </svg>
              </div>
              <div className="card-text">
                {error ? (
                  <p style={{ color: 'red' }} className="text-center">
                    {error}
                  </p>
                ) : (
                  ''
                )}
                <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                  <div>
                    <iframe
                      className="responsive-iframe"
                      src={video.link}
                      title="YouTube video"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div></div>
                </div>
                <h1 className="text-xl md:text-2xl font-bold leading-tight text-gray-900">
                  Hello {message.expert}
                </h1>

                <p className="text-base md:text-lg text-gray-700 mt-3 ">
                  It is to inform you that your video titled "{video.title}"
                  cannot be approved.
                  <br />
                  Reason : {message.reason}
                  <br />
                  Message : {message.message}
                </p>
              </div>
              <div className="card-mail flex items-center my-10">
                <button
                  onClick={() => expertVidRejected(id)}
                  className="bg-orange-500 hover:bg-orange-600 hover:border-orange-600 text-white font-bold capitalize px-3 py-2 text-base md:text-lg rounded-md border-t border-r border-b border-orange-500"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default ExpertRejectedVideoDetailedViewPage;
