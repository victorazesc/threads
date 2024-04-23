"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { ChevronRight, EyeIcon, EyeOffIcon, InfoIcon } from "lucide-react";
import Image from "next/image";

const Signin = () => {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user) {
            window.location.reload();
        }
    }, [session]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const res = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (res?.error) {
            setError(res.error as string)
        };

        if (!res?.error) {
            return router.push("/")
        };
    };

    return (
        <>
            <img src={'/assets/threads-banner.png'} width={"100%"} alt={"threads banner"} className="absolute top-0 hidden md:block" />

            <div className=" w-full flex relative flex-col justify-center items-center container mx-auto min-h-[100vh] top-0">
                <div className="flex flex-col relative justify-center items-center top-0 w-full">
                    <img src={'/assets/logo.svg'} alt={"threads logo"} className="fill-white md:hidden" width={60} />

                    <section className="flex items-center justify-center w-full max-w-[370px] xs:h-80vh m-0 pb-6 z-10 pt-6 mt-0 md:mt-[15vh]  relative flex-col">
                        <form onSubmit={handleSubmit} className="w-full ">
                            {error && <div className="text-[#FF6166] flex items-center justify-center gap-2">
                                <InfoIcon />
                                <div className="text-sm">{error}</div>
                            </div>}
                            <h3 className="w-full leading-base-line mb-4 text-primary text-16">Inicia sessão com a tua conta do Instagram</h3>
                            <input
                                type="email"
                                placeholder="Nome de utilizador, telefone ou e-mail"
                                className="w-full text-primary py-4 px-2.5 rounded-xl bg-custom-backgrounds-tertiary text-15 mb-2"
                                name="email"
                            />

                            <div className="flex w-full mb-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Senha"
                                    className="w-full text-primary py-4 px-2.5 rounded-l-xl bg-custom-backgrounds-tertiary text-15"
                                    name="password"
                                />
                                <button
                                    className="flex text-primary items-center justify-center w-2/12 transition duration-150 bg-custom-backgrounds-tertiary border-r-xl rounded-r-xl ease hover:bg-[#1F1F1F]"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowPassword(!showPassword)
                                    }}
                                    type='button'
                                >
                                    {showPassword
                                        ? <EyeIcon />
                                        : <EyeOffIcon />}
                                </button>
                            </div>
                            <button
                                className="w-full text-black bg-white py-4 px-2.5 rounded-xl text-15"
                                type='submit'
                            >
                                Iniciar Sessão
                            </button>

                            <div className="relative flex items-center justify-center w-full h-10 text-secondary font-normal">
                                <div className="absolute w-full h-px top-2/4 bg-[#2E2E2E]"></div>
                                <p className="z-10 flex items-center justify-center w-8 h-6 bg-custom-backgrounds-primary">ou</p>
                            </div>

                            <button
                                className="flex text-primary w-full items-center gap-3 px-4 py-4 text-sm align-middle transition-all bg-custom-backgrounds-primary rounded-xl ease border border-primary-outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    signIn("google")
                                }}
                                type='button'
                            >
                                <svg
                                    data-testid="geist-icon"
                                    height="45"
                                    strokeLinejoin="round"
                                    viewBox="0 0 16 16"
                                    width="45"
                                    style={{ color: 'currentColor' }}
                                >
                                    <path
                                        d="M8.15991 6.54543V9.64362H12.4654C12.2763 10.64 11.709 11.4837 10.8581 12.0509L13.4544 14.0655C14.9671 12.6692 15.8399 10.6182 15.8399 8.18188C15.8399 7.61461 15.789 7.06911 15.6944 6.54552L8.15991 6.54543Z"
                                        fill="#4285F4"
                                    ></path>
                                    <path
                                        d="M3.6764 9.52268L3.09083 9.97093L1.01807 11.5855C2.33443 14.1963 5.03241 16 8.15966 16C10.3196 16 12.1305 15.2873 13.4542 14.0655L10.8578 12.0509C10.1451 12.5309 9.23598 12.8219 8.15966 12.8219C6.07967 12.8219 4.31245 11.4182 3.67967 9.5273L3.6764 9.52268Z"
                                        fill="#34A853"
                                    ></path>
                                    <path
                                        d="M1.01803 4.41455C0.472607 5.49087 0.159912 6.70543 0.159912 7.99995C0.159912 9.29447 0.472607 10.509 1.01803 11.5854C1.01803 11.5926 3.6799 9.51991 3.6799 9.51991C3.5199 9.03991 3.42532 8.53085 3.42532 7.99987C3.42532 7.46889 3.5199 6.95983 3.6799 6.47983L1.01803 4.41455Z"
                                        fill="#FBBC05"
                                    ></path>
                                    <path
                                        d="M8.15982 3.18545C9.33802 3.18545 10.3853 3.59271 11.2216 4.37818L13.5125 2.0873C12.1234 0.792777 10.3199 0 8.15982 0C5.03257 0 2.33443 1.79636 1.01807 4.41455L3.67985 6.48001C4.31254 4.58908 6.07983 3.18545 8.15982 3.18545Z"
                                        fill="#EA4335"
                                    ></path>
                                </svg>
                                <span className="flex-grow">
                                    Faça login no Google
                                </span>
                                <ChevronRight />
                            </button>
                            {/* <Link href="/register" className="text-sm transition duration-150 text-[#A1A1A1] ease hover:text-white">Não tem uma conta?</Link> */}
                        </form>
                    </section>
                </div>
            </div>
        </>

    );
}

export default Signin;
