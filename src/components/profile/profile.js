import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Profile() {
  const { userId } = useParams(); 
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-light-neutral-50 dark:bg-dark-neutral-800 transition-colors">
      {/* محتوى صفحة مريم الشخصي هنا */}
      <h1 className="text-pink-600 font-bold p-10">Welcome to your space, {user?.userName}!</h1>
    </div>
  );
};