import { GoogleLogin } from '@react-oauth/google'

export default function GoogleButton({ setGoogleData }) {
    return (
        <div className="w-full flex justify-center px-5">
            <div className="w-full max-w-[380px] flex justify-center">
                <GoogleLogin
                    onSuccess={(response) => setGoogleData(response.credential)}
                    onError={() => console.log('Error Google')}
                    text="continue_with"
                    theme="outline"
                    shape="rectangular"
                    width="350"
                />
            </div>
        </div>
    )
}