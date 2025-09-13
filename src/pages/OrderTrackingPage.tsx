import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, Check as CheckCircle, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockOrders } from '@/data/mockData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundOrder = mockOrders.find((o) => o.id === orderId) || {
      id: orderId,
      userId: '1',
      items: [
      {
        id: 'prod-1',
        name: 'Sample Product',
        price: 29.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'
      }],

      total: 29.99,
      status: 'processing',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    };
    setOrder(foundOrder);
  }, [orderId]);

  const getTrackingSteps = (status: string) => {
    const steps = [
    { id: 'placed', label: 'Order Placed', icon: Clock, completed: true },
    { id: 'processing', label: 'Processing', icon: Package, completed: ['processing', 'shipped', 'delivered'].includes(status) },
    { id: 'shipped', label: 'Shipped', icon: Truck, completed: ['shipped', 'delivered'].includes(status) },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle, completed: status === 'delivered' }];

    return steps;
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Button asChild>
            <Link to="/dashboard/customer">Back to Dashboard</Link>
          </Button>
        </div>
        <Footer />
      </div>);

  }

  const trackingSteps = getTrackingSteps(order.status);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/dashboard/customer">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Tracking */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-heading">
                    Order #{order.id}
                  </CardTitle>
                  <Badge className={`${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'}`
                  }>
                    <span className="capitalize">{order.status}</span>
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                {/* Tracking Timeline */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Order Status</h3>
                  <div className="space-y-4">
                    {trackingSteps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.id} className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed ?
                          'bg-primary text-primary-foreground' :
                          'bg-muted text-muted-foreground'}`
                          }>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${
                            step.completed ? 'text-foreground' : 'text-muted-foreground'}`
                            }>
                              {step.label}
                            </p>
                            {step.completed && index === trackingSteps.findIndex((s) => s.completed) &&
                            <p className="text-sm text-muted-foreground">
                                {step.id === 'delivered' ? 'Completed' : 'In progress'}
                              </p>
                            }
                          </div>
                          {index < trackingSteps.length - 1 &&
                          <div className={`w-px h-8 ml-5 ${
                          step.completed ? 'bg-primary' : 'bg-muted'}`
                          } />
                          }
                        </div>);

                    })}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Delivery Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Information
                  </h3>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                    <p className="font-medium">
                      {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Campus Center, University Ave
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {order.items.map((item: any) =>
                  <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                        <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover" />

                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${(order.total * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${(order.total * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>📧 Order updates sent to your email</p>
                    <p>📱 SMS notifications available</p>
                    <p>🚚 Free campus delivery</p>
                  </div>
                </div>

                <Button asChild className="w-full" variant="outline">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>);

};

export default OrderTrackingPage;