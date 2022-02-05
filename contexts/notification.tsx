import { AnimatePresence, motion, usePresence } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { CustomAppProps, CustomPage } from "../lib/custom-page";
import { v4 as uuidv4 } from 'uuid'
import { SafeToRemove } from "framer-motion/types/components/AnimatePresence/use-presence";


type NotificationProps = {
    text: string,
    index: number
}
const Notification = ({ text, index }: NotificationProps) => {
    return (
        <motion.div
            initial={'hidden'}
            animate='visible'
            exit='hidden'
            variants={{
                hidden: {
                    top: `${index * 4 + 2}rem`,
                    left: '-24rem',
                },
                visible: {
                    top: `${index * 4 + 2}rem`,
                    left: '2rem',
                }
            }}
            transition={{
                type: 'spring',
                damping: 10,
                stiffness: 100
            }}
            className={`
                h-12
                bg-red-500
                rounded-xl
                place-items-center
                p-4
                absolute
                top-8
                shadow-lg
                flex
            `}
        >
            <div className="text-center w-full font-['Poppins'] font-bold text-red-100">
                {text}
            </div>
        </motion.div>
    )
}

function remove(arr: (Omit<NotificationProps, 'index'> & { uuid: string })[], item: (Omit<NotificationProps, 'index'> & { uuid: string })) {
    const newArr = [...arr];
    const index = newArr.findIndex((value) => value.uuid === item.uuid)
    newArr.splice(index, 1);
    return newArr;
};

function add<T>(arr: T[], item: T) {
    return [...arr, item];
}

const NOTIFICATION_LENGTH: number = 3000 // 3s

const NotificationContext = React.createContext({
    showNotification: (text: string) => { }
});

type NotificationProviderProps = {
    children: React.ReactElement<CustomAppProps, CustomPage>
}
export const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const [notifications, setNotifications] = useState<(Omit<NotificationProps, 'index'> & { uuid: string })[]>([])

    const showNotification = async (text: string) => {
        const notif = { text: text, uuid: uuidv4() }
        setNotifications(old => add(old, notif))
        setTimeout(async () => {
            setNotifications(old => remove(old, notif))
        }, NOTIFICATION_LENGTH)
    }

    return (
        <NotificationContext.Provider
            value={{
                showNotification
            }}
        >
            <AnimatePresence>
                {notifications.map((value, index) => <Notification key={value.uuid} {...value} index={index} />)}
            </AnimatePresence>

            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);