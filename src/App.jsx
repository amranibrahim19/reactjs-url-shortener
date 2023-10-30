import React, { useEffect, useState } from 'react'

export default function Example() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  // generate random string
  const generateRandomString = () => {
    const length = 6;
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  // Event handler for input changes


  // post request to api
  const postUrl = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:1337/api/url-shorteners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          longUrl: url,
          shortUrl: generateRandomString(),
        }
      }),
    });

    if (response.status !== 200) {
      console.log('Error');
      return;
    }

    const data = await response.json();
    setShortUrl(data.data.attributes.shortUrl);
    setId(data.data.id);

    console.log(data);
    // setUrl('');
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full">
        <form className="max-w-md w-full space-y-8" onSubmit={postUrl}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-5 text-gray-900">
                URL Shortener
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Shorten your long URL to a short one.
              </p>

              <div class="mt-10 grid grid-cols-1 gap-4">
                <div>
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type='text'
                      name='url'
                      id='url'
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className='mt-10'>
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    Your short URL
                  </span>
                  {shortUrl && (
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      <a
                        href={`http://localhost:1337/api/url-shorteners/${id}`}
                        target="_blank"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        http://localhost:1337/api/url-shortener/{shortUrl}
                      </a>
                    </span>
                  )}
                </div>
              </div>

            </div>

          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-white bg-red-500 px-3 py-1.5 shadow-sm rounded-md"
              onClick={() => {
                setUrl('');
                setShortUrl('');
                setMessage('');
              }}
            >
              Clear
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Shorten
            </button>
          </div>
        </form>


      </div>
    </>
  )
}
