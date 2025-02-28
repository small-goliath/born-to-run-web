import SignUpForm from './SignUpForm';

export default function SignUp() {

  return (
    <section className="px-4 space-y-6">
      <h1 className="text-title-xl font-bold leading-title-xl py-4">이름과 크루를 알려주세요</h1>
      <SignUpForm />
    </section>
  );
}
