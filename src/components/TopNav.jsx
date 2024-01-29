import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector, useDispatch } from 'react-redux';
import { setActivePage, setPageDisplayName } from '../reducers/PagesSlice';
import { logoutUser } from '../reducers/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { PAGE_POS, PAGE_STOCKS } from '../utils/pageName';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function TopNav() {
    const dispatch = useDispatch();
    const navigation = useSelector((state) => state.pages.navigation);
    const user = useSelector((state) => state.auth.user);
    const userRole = useSelector((state) => state.auth.userRole);
    const navigate = useNavigate();
    const pageDisplayName = useSelector((state) => state.pages.pageDisplayName);

    const handleItemClick = (pageName) => {
        if (pageName === "POS") {
            dispatch(setPageDisplayName(PAGE_POS));
            navigate('/pos');
        } else if (pageName === "Stock Management") {
            dispatch(setPageDisplayName(PAGE_STOCKS));
            navigate('/stocks');
        }
        dispatch(setActivePage({ pageName }));
    };

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl ">
                        <div className="relative flex h-16 items-center justify-between px-2 sm:px-6 lg:px-8">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {userRole === "ADMIN" ? <>
                                            {navigation.map((item) => (
                                                <button
                                                    key={item.name}
                                                    onClick={() => handleItemClick(item.name)}
                                                    className={classNames(
                                                        'rounded-md px-3 py-2 text-sm font-medium',
                                                        item.active ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                    )}
                                                    aria-current={item.active ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </button>
                                            ))}
                                        </> :
                                            <>
                                                <button
                                                    key="POS"
                                                    onClick={() => handleItemClick("POS")}
                                                    className={classNames(
                                                        'rounded-md px-3 py-2 text-sm font-medium bg-gray-900 text-white'
                                                    )}

                                                >
                                                    POS
                                                </button>
                                            </>}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full items-center bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 px-4">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="../../assets/logo/user-icon.png"
                                                alt=""
                                            />
                                            <span className="text-white ml-4">{user?.userFullName}</span>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        onClick={() => dispatch(logoutUser())}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'cursor-pointer block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>


                    </div>

                    <div className="h-8 w-full flex items-center align-middle justify-center bg-[#1ba1e2] text-white">
                        <h3 className="text-white leading-3 ">{pageDisplayName}</h3>
                    </div>
                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {userRole === "ADMIN" ? <>
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="button"
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        onClick={() => handleItemClick(item.name)}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </> :
                                <>
                                    <Disclosure.Button
                                        key="POS"
                                        as="button"
                                        onClick={() => handleItemClick("POS")}
                                        className={classNames(
                                            'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
                                        )}

                                    >
                                        POS
                                    </Disclosure.Button>
                                </>
                            }
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}