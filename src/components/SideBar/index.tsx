import { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { Dialog, Menu, Transition, Disclosure } from '@headlessui/react';
import {
  Bars3Icon,
  Cog6ToothIcon,
  XMarkIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import {
  sideNavigation,
  userNavigation,
  userLoggedNavigation,
  sideNavigationLogged,
} from '../../utils/navigation';
import { RootState, store } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/authentication/authSlice';
import { isTokenValid } from '../../utils/checkToken';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function SideBar({ children }: { children: any }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state: RootState) => state.auth.user);
  const userMenu = user ? userLoggedNavigation : userNavigation;
  const navigation = user ? sideNavigationLogged : sideNavigation;
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    dispatch({ type: 'NAVIGATE_TO', payload: route });
    navigate(route, { replace: true });
  };

  useEffect(() => {
    if (!user) {
      //Check tokens
      const token: any = localStorage.getItem('token');
      if (!token) {
        dispatch(logout());
      }
      const isValid: any = isTokenValid(token);
      isValid ? handleNavigation('/user/main') : dispatch(logout());
    }
  }, [user]);

  const toggleCurrent = (item: any, dest: string) => {
    navigate(`${dest}`);
    navigation.map((i) =>
      i == item ? (i.current = true) : (i.current = false)
    );
  };

  return (
    <>
      <div className="bg-gray-900">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                {item.children ? (
                                  <Disclosure as="div">
                                    {({ open }) => (
                                      <>
                                        <Disclosure.Button
                                          className={classNames(
                                            item.current
                                              ? 'bg-gray-800 text-white'
                                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                            'w-full group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                          )}
                                        >
                                          <item.icon
                                            className="h-6 w-6 shrink-0 text-gray-400"
                                            aria-hidden="true"
                                          />
                                          {item.name}
                                          <ChevronRightIcon
                                            className={classNames(
                                              open
                                                ? 'rotate-90 text-gray-500'
                                                : 'text-gray-400',
                                              'ml-auto h-5 w-5 shrink-0'
                                            )}
                                            aria-hidden="true"
                                          />
                                        </Disclosure.Button>
                                        <Disclosure.Panel
                                          as="ul"
                                          className="mt-1 px-2"
                                        >
                                          {item.children.map((subItem: any) => (
                                            <li key={subItem.name}>
                                              <Disclosure.Button
                                                as="a"
                                                onClick={() =>
                                                  toggleCurrent(
                                                    item,
                                                    subItem.href as string
                                                  )
                                                }
                                                className={classNames(
                                                  subItem.current
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                  'pl-8 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                )}
                                              >
                                                {subItem.name}
                                              </Disclosure.Button>
                                            </li>
                                          ))}
                                        </Disclosure.Panel>
                                      </>
                                    )}
                                  </Disclosure>
                                ) : (
                                  <a
                                    onClick={() =>
                                      toggleCurrent(item, item.href as string)
                                    }
                                    className={classNames(
                                      item.current
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    )}
                                  >
                                    <item.icon
                                      className="h-6 w-6 shrink-0"
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </li>
                        {/* <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Your teams
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li> */}
                        <li className="mt-auto">
                          <a
                            onClick={() => navigate('/user/settings')}
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        {item.children ? (
                          <Disclosure as="div">
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'w-full group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                  <ChevronRightIcon
                                    className={classNames(
                                      open
                                        ? 'rotate-90 text-gray-500'
                                        : 'text-gray-400',
                                      'ml-auto h-5 w-5 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel as="ul" className="mt-1 px-2">
                                  {item.children.map((subItem: any) => (
                                    <li key={subItem.name}>
                                      <Disclosure.Button
                                        as="a"
                                        onClick={() =>
                                          toggleCurrent(
                                            item,
                                            subItem.href as string
                                          )
                                        }
                                        className={classNames(
                                          subItem.current
                                            ? 'bg-gray-800 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                          'pl-8 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                        )}
                                      >
                                        {subItem.name}
                                      </Disclosure.Button>
                                    </li>
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ) : (
                          <a
                            onClick={() =>
                              toggleCurrent(item, item.href as string)
                            }
                            className={classNames(
                              item.current
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                          >
                            <item.icon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    Your teams
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li> */}
                <li className="mt-auto">
                  <a
                    onClick={() => navigate('/user/settings')}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-900 bg-gray-900 ">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="bg-gray-900 block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm focus:bg-gray-900 caret-gray-400"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src={user ? user.avatar : null}
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      ></span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-gray-100 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userMenu.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-200' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="bg-gray-800 py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
