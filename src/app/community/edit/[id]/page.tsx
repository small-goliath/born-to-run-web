import EditForm from '@/components/feed/community/EditForm';
import useUser from '@/hooks/useUser';

export default function FeedEditPage() {
  const { isLoggedIn, isUserError } = useUser();
  
  return (
    <section>
      <EditForm isLoggedIn={isLoggedIn} isUserError={isUserError}/>
    </section>
  );
}
