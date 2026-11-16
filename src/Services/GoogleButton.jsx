import { GoogleLogin } from '@react-oauth/google'

export default function GoogleButton({ setGoogleData }) {
    return (
        <div className="GoogleButton">
            <GoogleLogin
                onSuccess={(response) => setGoogleData(response.credential)}
                onError={() => console.log('Error Google')}
                text="continue_with"
                theme="outline"
                shape="rectangular"
                width="380"
            />
        </div>
    )
}