import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Treemap } from 'recharts';
import { Users, Star, Book, Smartphone, Globe, MessageSquare, TrendingUp, Clock, DollarSign, Activity } from 'lucide-react';

const Analytics = () => {
  const [visitorData, setVisitorData] = useState([
    { name: 'Jan', visitors: 4000 },
    { name: 'Feb', visitors: 3000 },
    { name: 'Mar', visitors: 2000 },
    { name: 'Apr', visitors: 2780 },
    { name: 'May', visitors: 1890 },
    { name: 'Jun', visitors: 2390 },
  ]);

  const satisfactionData = [
    { name: 'Jan', satisfaction: 4.2 },
    { name: 'Feb', satisfaction: 4.5 },
    { name: 'Mar', satisfaction: 4.3 },
    { name: 'Apr', satisfaction: 4.6 },
    { name: 'May', satisfaction: 4.8 },
    { name: 'Jun', satisfaction: 4.7 },
  ];

  const exhibitPopularityData = [
    { name: 'Ancient Artifacts', value: 400 },
    { name: 'Modern Art', value: 300 },
    { name: 'Natural History', value: 300 },
    { name: 'Science & Tech', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const popularTopics = [
    { topic: 'Viking Age', count: 1250 },
    { topic: 'Danish Royal Family', count: 980 },
    { topic: 'Danish Design', count: 850 },
    { topic: 'Hans Christian Andersen', count: 720 },
    { topic: 'Danish Cuisine', count: 650 },
  ];

  const popularQuestions = [
    { question: "What was life like during the Viking Age?", count: 450 },
    { question: "Who are the current members of the Danish Royal Family?", count: 380 },
    { question: "What are the key principles of Danish design?", count: 320 },
    { question: "What inspired Hans Christian Andersen's fairy tales?", count: 290 },
    { question: "What are traditional Danish dishes?", count: 250 },
  ];

  const visitorDemographics = [
    { subject: 'Under 18', A: 120, B: 110, fullMark: 150 },
    { subject: '18-24', A: 98, B: 130, fullMark: 150 },
    { subject: '25-34', A: 86, B: 130, fullMark: 150 },
    { subject: '35-44', A: 99, B: 100, fullMark: 150 },
    { subject: '45-54', A: 85, B: 90, fullMark: 150 },
    { subject: '55+', A: 65, B: 85, fullMark: 150 },
  ];

  const exhibitEngagement = [
    {
      name: 'Exhibits',
      children: [
        { name: 'Ancient Artifacts', size: 3000 },
        { name: 'Modern Art', size: 2500 },
        { name: 'Natural History', size: 2000 },
        { name: 'Science & Tech', size: 1500 },
        { name: 'Local Culture', size: 1000 },
      ],
    },
  ];

  const [realtimeVisitors, setRealtimeVisitors] = useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeVisitors(prev => Math.floor(prev + Math.random() * 10 - 5));
      setVisitorData(prevData => {
        const newData = [...prevData];
        const lastMonth = newData[newData.length - 1];
        lastMonth.visitors += Math.floor(Math.random() * 100 - 50);
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const CustomXAxis = (props) => <XAxis {...props} />;
  const CustomYAxis = (props) => <YAxis {...props} />;

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Visitor Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Users className="mr-2" /> Real-time Visitors
          </h2>
          <p className="text-3xl font-bold text-blue-600">{realtimeVisitors}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Star className="mr-2" /> Avg. Satisfaction
          </h2>
          <p className="text-3xl font-bold text-green-600">4.5 / 5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Clock className="mr-2" /> Avg. Visit Duration
          </h2>
          <p className="text-3xl font-bold text-purple-600">1h 45m</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <DollarSign className="mr-2" /> Revenue Today
          </h2>
          <p className="text-3xl font-bold text-yellow-600">$3,450</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2" /> Monthly Visitors
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <CustomXAxis dataKey="name" />
              <CustomYAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitors" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Star className="mr-2" /> Visitor Satisfaction
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={satisfactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <CustomXAxis dataKey="name" />
              <CustomYAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="satisfaction" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="mr-2" /> Exhibit Popularity
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={exhibitPopularityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {exhibitPopularityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" /> Visitor Demographics
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={visitorDemographics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="This Month" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Last Month" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Book className="mr-2" /> Most Popular Topics
          </h2>
          <ul className="space-y-2">
            {popularTopics.map((topic, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{topic.topic}</span>
                <span className="font-semibold">{topic.count} queries</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MessageSquare className="mr-2" /> Most Asked Questions
          </h2>
          <ul className="space-y-2">
            {popularQuestions.map((question, index) => (
              <li key={index} className="flex flex-col">
                <span className="text-sm font-medium">{question.question}</span>
                <span className="text-xs text-gray-500">{question.count} times asked</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Smartphone className="mr-2" /> Exhibit Engagement Heatmap
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <Treemap
            data={exhibitEngagement}
            dataKey="size"
            ratio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent colors={COLORS} />}
          />
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomizedContent = (props) => {
  const { root, depth, x, y, width, height, index, colors, name } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 4)] : 'none',
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 ? (
        <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
          {name}
        </text>
      ) : null}
    </g>
  );
};

export default Analytics;