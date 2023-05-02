import React, { ChangeEventHandler } from 'react';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Switch } from '@headlessui/react';
import { useAppDispatch } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { submitArticle } from '../../features/articles/articlesAPI';
import { postSubmitArticles } from '../../features/articles/articlesSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const categoryList: string[] = [
  'Finances',
  'Politics',
  'Technology',
  'Stocks',
  'Crypto',
  'Real Estate',
  'Economy',
  'Business',
  'Entertainment',
  'Sports',
  'AI',
  'Education',
  'Other',
];

const SubmitArticle: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [agreed, setAgreed] = useState(false);
  const [title, setTitle] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | undefined | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>('');

  const handleSubmit: ChangeEventHandler<EventTarget> = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        description,
        headline,
        category,
        content,
        agreed,
        file,
      };
      const resultAction = await dispatch(postSubmitArticles(payload));
      const response = unwrapResult(resultAction);
      console.log('Article submitted successfully:', response);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image')) {
      setFile(file);
      const reader: any = new FileReader();
      reader.onload = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    } else {
      setImagePreviewUrl(null);
      setFile(null);
      setError('Error uploading file');
    }
  };

  return (
    <div className="w-full flex justify-between">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <aside className="flex-none w-1/4 hidden  border md:block">
        {/* command instructions to insert images, lists and other */}
      </aside>
      <div className="flex flex-col flex-auto">
        <div className="mx-auto max-w-2xl text-center flex-auto">
          <h2 className="text-3xl font-bold tracking-tight text-indigo-500 sm:text-4xl">
            Create an Article
          </h2>
          <p className="mt-2 text-md leading-8 text-gray-300">
            We are thrilled to see what you have to share with the world! Please
            fill out the form below to submit your article.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full flex-auto mt-16 max-w-xl sm:mt-10"
        >
          <div className="flex-auto grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm font-semibold leading-6 text-gray-300"
              >
                Title
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 caret-gray-600"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold leading-6 text-gray-300"
              >
                Description
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="description"
                  id="description"
                  autoComplete="description"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 caret-gray-600"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-semibold leading-6 text-gray-300"
              >
                Category
              </label>
              <div className="relative mt-2.5">
                <div className="w-full absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="category" className="sr-only w-full">
                    Category
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={category}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCategory(e.target.value)
                    }
                    className="w-full h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    {categoryList.map((category: string) => (
                      <option>{category}</option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 caret-gray-600"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-300"
              >
                Content
              </label>
              <div className="mt-2.5">
                <textarea
                  name="content"
                  id="content"
                  rows={15}
                  value={content}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 caret-gray-600"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setContent(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-300"
              >
                Image
              </label>
              <div className="flex items-center justify-center w-full mt-2.5">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full sm:h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  {!imagePreviewUrl ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Upload an image</span>{' '}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG or JPG (MAX. 800x400px)
                      </p>
                    </div>
                  ) : (
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="w-full h-32 mt-4 rounded-md"
                    />
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            {error && (
              <p
                className="text-md text-red-500 mt-2 text-center"
                style={{ minHeight: '1rem' }}
              >
                {error}
              </p>
            )}
            <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className={classNames(
                    agreed ? 'bg-indigo-600' : 'bg-gray-200',
                    'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  )}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      agreed ? 'translate-x-3.5' : 'translate-x-0',
                      'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </div>
              <Switch.Label className="text-sm leading-6 text-gray-600">
                By selecting this, you agree to our{' '}
                <a href="#" className="font-semibold text-indigo-600">
                  privacy&nbsp;policy
                </a>
                .
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitArticle;
