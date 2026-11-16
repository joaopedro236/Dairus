import { GoogleLogin } from '@react-oauth/google'

export default function GoogleButton({setGoogleData}) {
    return (
        <GoogleLogin
            onSuccess={(response) => {
                console.log('SUCESSO:', response)
                setGoogleData(response.credential)
            }}
            onError={() => console.log('Error Google')}
            text="continue_with"
            theme="outline"
            shape="pill"
        />
    )
}