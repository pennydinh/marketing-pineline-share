"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationCenter = exports.showNotification = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Notification_1 = require("./Notification");
const container = {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    paddingTop: 20,
    pointerEvents: 'none',
    backgroundColor: 'transparent',
};
const notificationCenter = (0, react_1.createRef)();
const showNotification = (content, durationInMs) => {
    return notificationCenter.current.addNotification({
        content,
        duration: durationInMs,
        created: Date.now(),
        id: String(Math.random()).replace('0.', ''),
    });
};
exports.showNotification = showNotification;
const NotificationCenter = () => {
    const [notifications, setNotifications] = (0, react_1.useState)([]);
    const onRemove = (0, react_1.useCallback)((id) => {
        setNotifications((not) => {
            return not.filter((n) => n.id !== id);
        });
    }, []);
    const addNotification = (0, react_1.useCallback)((notification) => {
        setNotifications((previousNotifications) => {
            return [...previousNotifications, notification];
        });
        return {
            replaceContent: (newContent, durationInMs) => {
                setNotifications((oldNotifications) => {
                    return oldNotifications.map((notificationToMap) => {
                        if (notificationToMap.id === notification.id) {
                            return {
                                ...notificationToMap,
                                duration: durationInMs,
                                content: newContent,
                                created: Date.now(),
                            };
                        }
                        return notificationToMap;
                    });
                });
            },
        };
    }, []);
    (0, react_1.useImperativeHandle)(notificationCenter, () => {
        return {
            addNotification,
        };
    }, [addNotification]);
    return ((0, jsx_runtime_1.jsx)("div", { style: container, children: notifications.map((n) => {
            return ((0, jsx_runtime_1.jsx)(Notification_1.Notification, { created: n.created, duration: n.duration, id: n.id, onRemove: onRemove, children: n.content }, n.id));
        }) }));
};
exports.NotificationCenter = NotificationCenter;
