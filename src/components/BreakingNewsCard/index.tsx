import { Article } from '../../features/news/newsSlice';

interface ArticleProps extends Article {}

function BreakingNewsCard({
  title,
  author,
  description,
  content,
  urlToImage,
  url,
  source,
  publishedAt,
}: ArticleProps): JSX.Element {
  return (
    <div className="w-full flex bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg mt-1">
      <div className="flex-shrink-0">
        <img
          src={urlToImage}
          alt={description}
          className="w-48 h-48 object-cover"
        />
      </div>
      <div className="w-full flex flex-col justify-between p-4">
        <div>
          <p className="text-xl font-bold">{title}</p>
          <p className="text-gray-400 md: max-h-16 lg: max-h-24 overflow-hidden">
            {description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current text-gray-500 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12z" />
              <path d="M10 14a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            <p className="text-gray-500 text-sm"></p>
          </div>
          <a href={url} className="text-blue-500 hover:text-blue-400 text-sm">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default BreakingNewsCard;
