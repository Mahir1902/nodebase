import Image from "next/image";
import Link from "next/link";


export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-col min-h-svh items-center justify-center bg-muted gap-6 p-6 md:p-10'>
            <div className='flex w-full max-w-sm flex-col gap-6'>
                <Link href="/" className='flex items-center gap-2 self-center font-medium'>
                    <Image src="logo/logo.svg" alt="Logo" width={100} height={100} />
                    Nodebase
                </Link>
                {children}
            </div>
        </div>
    )
}