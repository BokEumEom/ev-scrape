import React, { useState } from 'react';

interface PostEditorProps {
    post: any; // Define more specific type if possible
    onSave: (postData: any) => void; // Using any here, but should ideally be more specific
  }
  
const PostEditor: React.FC<PostEditorProps> = ({ post, onSave }) => {
const [title, setTitle] = useState(post.title);
const [content, setContent] = useState(post.content);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ title, content });
};

return (
    <form onSubmit={handleSubmit} className="space-y-4">
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md" />
    <textarea value={content} onChange={(e) => setContent(e.target.value)} className="block w-full h-52 px-4 py-2 border border-gray-300 rounded-md" />
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
    </form>
);
};
  
export default PostEditor;
