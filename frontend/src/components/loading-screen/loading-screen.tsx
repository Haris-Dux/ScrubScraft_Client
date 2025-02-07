
export default function LoadingScreen() {
    return (
        <section className="w-full bg-[#F5F5F5]">
            <div className="flex justify-center items-center min-h-[100vh]">
                <div className="loader"></div>
            </div>
            <style>{`
                .loader {
                    height: 5px;
                    width: 150px;
                    --c: no-repeat linear-gradient(#1310db 0 0);
                    background: var(--c), var(--c), #e0e0e0;
                    background-size: 60% 100%;
                    animation: l16 3s infinite;
                    border-radius: 10px;
                }
                @keyframes l16 {
                    0% { background-position: -150% 0, -150% 0 }
                    66% { background-position: 250% 0, -150% 0 }
                    100% { background-position: 250% 0, 250% 0 }
                }
            `}</style>
        </section>
    )
}
