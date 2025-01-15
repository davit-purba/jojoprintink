import React from 'react';
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import ChatBubbleLeftRightIcon from '@heroicons/react/24/outline/ChatBubbleLeftRightIcon';
import HeartIcon from '@heroicons/react/24/outline/HeartIcon';

const Steps = () => {
    const data = [
        { 
            icon: < DocumentTextIcon className="w-10 h-10 inline-block mr-2" />, 
            description: "Fill out the Questionnaire to Assess Your Mental Health." 
        },
        { 
            icon: <ChatBubbleLeftRightIcon className="w-10 h-10 inline-block mr-2" />, 
            description: "Talk to an Expert for Further Analysis." 
        },
        { 
            icon: <HeartIcon className="w-10 h-10 inline-block mr-2" />, 
            description: "Accept Recommendations and Begin Recovery Steps." 
        },
    ];

    return (
        <div className="grid place-items-center w-full">
            <div className="max-w-6xl w-full py-24 px-4 content-center justify-center">
                <h2 className="text-3xl text-center font-bold">Easy Steps to Get a Mental Health Diagnosis</h2>
                <div className="grid mt-24 md:grid-cols-3 grid-cols-1 gap-8">
                    {data.map((item, index) => (
                        <div key={index} className="card w-full bg-base-100 shadow-xl hover:shadow-2xl">
                            <div className="grid -mt-4 place-items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-500 text-slate-100 flex font-bold justify-center items-center">
                                    <p>{index + 1}</p>
                                </div>
                            </div>
                            <div className="card-body items-center text-center">
                                <p className="text-primary">{item.icon}</p>
                                <p className="mt-2">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Steps;
