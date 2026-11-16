import { GoogleLogin } from '@react-oauth/google'

export default function GoogleButton({ setGoogleData }) {
    return (
        <div className="w-full max-w-[480px] px-5">
            <GoogleLogin
                onSuccess={(response) => {
                    setGoogleData(response.credential)
                }}
                onError={() => console.log('Error Google')}
                text="continue_with"
                theme="outline"
                shape="rectangular"
                width="480"
            />
        </div>
    )
}