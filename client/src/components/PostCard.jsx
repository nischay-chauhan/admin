const PostCard = ({ author, title, content, createdAt }) => {
    const postDate = new Date(createdAt);

    const formattedDate = postDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    const formattedTime = postDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
  
    return (
      <div className="border p-4 mb-4 flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-500 mb-2">Author: {author.firstName} {author.lastName}</p>
          <p className="text-gray-700 mb-2">{content}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 mb-2">Date: {formattedDate}</p>
          <p className="text-gray-500">Time: {formattedTime}</p>
        </div>
      </div>
    );
  };
  
  export default PostCard;
  