import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CheckIcon, CreditCardIcon, StarIcon } from 'lucide-react';
import { toast } from 'sonner';

// Replace with your actual Stripe publishable key from your Stripe dashboard
const stripePromise = loadStripe('pk_test_51OWdEt2lYf7D1sK7AXOz68fRpMYJoZR7CG7mJJYXLyD6SpE03Zt7RDM3WOY1M1izj8d5Cxst9q7I7HhCGgIx8uqd00P9GdZAqP');

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutForm = ({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardError, setCardError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    setIsProcessing(true);
    
    try {
      // In a real implementation, you would:
      // 1. Make an API call to your backend to create a PaymentIntent
      // Example: const { clientSecret } = await fetch('/api/create-payment-intent', { method: 'POST', ... })
      
      // 2. Confirm the payment with Stripe using the clientSecret
      // const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, { ... })
      
      // For now, we'll simulate this process
      const cardElement = elements.getElement(CardElement);
      
      if (cardElement) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name,
            email,
          },
        });

        if (error) {
          console.error(error);
          setCardError(error.message || 'An error occurred with your payment');
          setIsProcessing(false);
        } else {
          console.log('PaymentMethod', paymentMethod);
          // This is where you would normally send the paymentMethod.id to your server
          // and complete the payment there, but we'll simulate success
          
          // Log payment info for demonstration purposes
          console.log('Payment would go to connected Stripe account');
          console.log('Customer:', { name, email });
          console.log('Payment method:', paymentMethod.id);
          
          toast.success('Premium access granted!');
          onSuccess();
          onClose();
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name on Card</Label>
        <input
          id="name"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Smith"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="card-element">Card Details</Label>
        <div className="p-3 border rounded-md">
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        {cardError && (
          <p className="text-sm text-red-500 mt-1">{cardError}</p>
        )}
      </div>
      
      <DialogFooter className="mt-6">
        <Button
          type="submit"
          className="w-full bg-quiz-accent hover:bg-quiz-accent/90"
          disabled={isProcessing || !stripe}
        >
          {isProcessing ? 'Processing...' : 'Pay $9.99'}
        </Button>
      </DialogFooter>
    </form>
  );
};

const PaymentModal = ({ isOpen, onClose, onSuccess }: PaymentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <StarIcon className="h-5 w-5 text-quiz-accent" />
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription>
            Get full access to your IQ analysis and personalized insights.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <Card className="border border-quiz-accent/20 bg-quiz-secondary/30">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Premium Analysis</h4>
                  <p className="text-sm text-muted-foreground">One-time purchase</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-semibold">$9.99</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t space-y-1">
                <div className="flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 mt-0.5 text-quiz-accent" />
                  <span className="text-sm">Detailed IQ analysis</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 mt-0.5 text-quiz-accent" />
                  <span className="text-sm">All cognitive insights</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 mt-0.5 text-quiz-accent" />
                  <span className="text-sm">Personalized recommendations</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Elements stripe={stripePromise}>
            <CheckoutForm onSuccess={onSuccess} onClose={onClose} />
          </Elements>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
