import { Formik } from "formik";
import { useEffect } from "react";
import { createUserProfile, fetchUserProfileById } from "../api";
import { PageWrapper } from "../components";
import { useUserContext } from "../context";
import { validateUserProfile } from "../utils";

const Onboarding = () => {
  const { user, signout } = useUserContext();

  useEffect(() => {
    fetchUserProfileById(user.id).then((currentProfile) => {
      if (currentProfile && validateUserProfile(currentProfile)) {
        window.location.href = "/";
      }
    });
  }, [user]);

  return (
    <PageWrapper
      heading="Setup Your Moonshot Profile"
      subheading="This information will be displayed publicly so be careful what you
              share."
      showNavBar={false}
    >
      <Formik
        initialValues={{
          avatar_url: user.user_metadata.avatar_url,
          email: user.user_metadata.email,
          first_name: user.user_metadata.full_name.split(" ")[0],
          last_name: user.user_metadata.full_name.split(" ")[1],
          geography: "",
          github_username: user.user_metadata.preferred_username,
          short_desc: "",
          user_id: user.id,
          role:"",
          industries:[],
          moonshot_affiliate:[],
        }}
        validate={(values) => {
          const errors = {};

          return errors;
        }}
        onSubmit={async (values) => {
          await createUserProfile(values);
          window.location.href = "/";
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            className="space-y-8 divide-y divide-gray-200"
            onSubmit={handleSubmit}
          >
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    First name
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.first_name}
                      autoComplete="given-name"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Last name
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.last_name}
                      autoComplete="family-name"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Email address
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      autoComplete="email"
                      className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Photo
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="geography"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Geography
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="geography"
                      id="geography"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.geography}
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                About
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  name="short_desc"
                  id = "short_desc"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.short_desc}
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={''}
                />
                <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Who are you?
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  id="role"
                  name="role"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.role}
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="founder">Founder</option>
                  <option value="investor">Investor</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
            </div>

                
             
          <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200 sm:border-t sm:border-gray-200">
            <div className="pt-6 sm:pt-5">
              <div role="group" aria-labelledby="label-email">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                  <div>
                    <div className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" >
                      Which Web3 industry are you in?
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg space-y-4">
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            name="industries"
                            type="checkbox"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value="arvr"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="industries" className="font-medium text-gray-700">
                            AR/VR

                          </label>
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            value="blockchain-infra"
                            name="industries"
                            type="checkbox"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="industries" className="font-medium text-gray-700">
                            Blockchain Infrastructure

                          </label>
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            value="nft"
                            name="industries"
                            type="checkbox"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="industries" className="font-medium text-gray-700">
                            NFT
                          </label>
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            value="games"
                            name="industries"
                            type="checkbox"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="industries" className="font-medium text-gray-700">
                            Games
                          </label>
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            value="defi"
                            name="industries"
                            type="checkbox"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="industries" className="font-medium text-gray-700">
                            Defi
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div> 
            <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200 sm:border-t sm:border-gray-200">
            <div className="pt-6 sm:pt-5">
              <div role="group" aria-labelledby="label-email">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                  <div>
                    <div className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700">
                      How did you join us? *
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg space-y-4">
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            name="moonshot_affiliate"
                            type="checkbox"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value="hackathon"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="moonshot_affiliate" className="font-medium text-gray-700">
                            Moonshot Hackathon

                          </label>
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            value="mafia"
                            name="moonshot_affiliate"
                            type="checkbox"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="moonshot_affiliate" className="font-medium text-gray-700">
                            Moonshot Mafia

                          </label>
                        </div>
                      </div>
                      
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
                
            </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  onClick={signout}
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default Onboarding;
