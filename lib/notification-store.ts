"use client"

import { useState, useEffect } from "react"

export type Notification = {
    id: string
    title: string
    message: string
    time: string
    read: boolean
    type: 'info' | 'success' | 'warning'
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 'n1',
        title: 'Booking Confirmed',
        message: 'Your Toyota Fortuner rental for March 1st has been confirmed.',
        time: '2 hours ago',
        read: false,
        type: 'success'
    },
    {
        id: 'n2',
        title: 'New Service Available',
        message: 'We now offer Accommodation Arrangements and Tour Guides!',
        time: '1 day ago',
        read: true,
        type: 'info'
    },
    {
        id: 'n3',
        title: 'Welcome to RideNet',
        message: 'Thank you for joining Zambia\'s premier transport network.',
        time: '2 days ago',
        read: true,
        type: 'info'
    }
]

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        // Load from localStorage or use mock
        const saved = localStorage.getItem('ridenet_notifications')
        if (saved) {
            const parsed = JSON.parse(saved)
            setNotifications(parsed)
            setUnreadCount(parsed.filter((n: Notification) => !n.read).length)
        } else {
            setNotifications(MOCK_NOTIFICATIONS)
            setUnreadCount(MOCK_NOTIFICATIONS.filter(n => !n.read).length)
            localStorage.setItem('ridenet_notifications', JSON.stringify(MOCK_NOTIFICATIONS))
        }
    }, [])

    const markAsRead = (id: string) => {
        const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n)
        setNotifications(updated)
        setUnreadCount(updated.filter(n => !n.read).length)
        localStorage.setItem('ridenet_notifications', JSON.stringify(updated))
    }

    const markAllAsRead = () => {
        const updated = notifications.map(n => ({ ...n, read: true }))
        setNotifications(updated)
        setUnreadCount(0)
        localStorage.setItem('ridenet_notifications', JSON.stringify(updated))
    }

    return { notifications, unreadCount, markAsRead, markAllAsRead }
}
