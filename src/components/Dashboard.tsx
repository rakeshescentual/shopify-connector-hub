
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheck, ShoppingBag, Users, Layers, TrendingUp, ArrowUpRight } from 'lucide-react';

const statusData = [
  {
    title: "Products Synced",
    value: "142",
    increase: "+12%",
    icon: <ShoppingBag size={18} />,
    color: "bg-blue-50 text-blue-500"
  },
  {
    title: "Test Participants",
    value: "879",
    increase: "+18%",
    icon: <Users size={18} />,
    color: "bg-purple-50 text-purple-500"
  },
  {
    title: "Feedback Collected",
    value: "1,243",
    increase: "+24%",
    icon: <Layers size={18} />,
    color: "bg-amber-50 text-amber-500"
  },
  {
    title: "Insights Generated",
    value: "56",
    increase: "+9%",
    icon: <TrendingUp size={18} />,
    color: "bg-emerald-50 text-emerald-500"
  }
];

const Dashboard = () => {
  return (
    <section id="dashboard" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connection Dashboard</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Monitor and manage your Shopify and PreProduct connection in one place.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statusData.map((item, index) => (
              <Card key={index} className="glass-card border-none animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">{item.title}</p>
                      <h3 className="text-2xl font-bold">{item.value}</h3>
                    </div>
                    <div className={`p-2.5 rounded-full ${item.color}`}>
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex items-center text-xs font-medium text-green-600 mt-4">
                    <ArrowUpRight size={14} className="mr-1" />
                    {item.increase} from last month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="glass-card border-none h-full animate-slide-up">
                <CardHeader className="pb-3">
                  <CardTitle>Connection Status</CardTitle>
                  <CardDescription>Real-time status of your integration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                        <span className="font-medium">Shopify API Connection</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <CircleCheck size={16} className="mr-1.5" />
                        <span className="text-sm">Active</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                        <span className="font-medium">PreProduct API Connection</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <CircleCheck size={16} className="mr-1.5" />
                        <span className="text-sm">Active</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                        <span className="font-medium">Webhooks</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <CircleCheck size={16} className="mr-1.5" />
                        <span className="text-sm">3/3 Active</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                        <span className="font-medium">Product Sync</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <CircleCheck size={16} className="mr-1.5" />
                        <span className="text-sm">Last sync: 5 mins ago</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="glass-card border-none h-full animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <CardHeader className="pb-3">
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common connection tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white hover:bg-slate-50 border border-gray-100 transition-colors">
                      <span className="font-medium">Sync Products Now</span>
                      <ArrowUpRight size={16} />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white hover:bg-slate-50 border border-gray-100 transition-colors">
                      <span className="font-medium">Test Connection</span>
                      <ArrowUpRight size={16} />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white hover:bg-slate-50 border border-gray-100 transition-colors">
                      <span className="font-medium">View Webhook Logs</span>
                      <ArrowUpRight size={16} />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white hover:bg-slate-50 border border-gray-100 transition-colors">
                      <span className="font-medium">Update Connection</span>
                      <ArrowUpRight size={16} />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white hover:bg-slate-50 border border-gray-100 transition-colors">
                      <span className="font-medium">View PreProduct Dashboard</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
