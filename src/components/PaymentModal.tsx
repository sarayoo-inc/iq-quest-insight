
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckIcon, CreditCardIcon, StarIcon } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal = ({ isOpen, onClose, onSuccess }: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    name: ''
  });
  
  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        name: ''
      });
    }
  }, [isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Simple formatting for card number (spaces every 4 digits)
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData({ ...formData, [name]: formatted.substring(0, 19) });
      return;
    }
    
    // Simple formatting for expiry date (MM/YY)
    if (name === 'expiryDate') {
      let formatted = value.replace(/\D/g, '');
      if (formatted.length > 2) {
        formatted = formatted.substring(0, 2) + '/' + formatted.substring(2, 4);
      }
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Premium access granted!');
      onSuccess();
    }, 1500);
  };
  
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
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name on Card</Label>
              <Input 
                id="name" 
                name="name"
                placeholder="John Smith"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input 
                  id="cardNumber" 
                  name="cardNumber"
                  placeholder="4242 4242 4242 4242" 
                  value={formData.cardNumber}
                  onChange={handleChange}
                  maxLength={19}
                  required
                />
                <CreditCardIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input 
                  id="expiryDate" 
                  name="expiryDate"
                  placeholder="MM/YY" 
                  value={formData.expiryDate}
                  onChange={handleChange}
                  maxLength={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input 
                  id="cvc" 
                  name="cvc"
                  placeholder="123" 
                  value={formData.cvc}
                  onChange={handleChange}
                  maxLength={3}
                  required
                />
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button
                type="submit"
                className="w-full bg-quiz-accent hover:bg-quiz-accent/90"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Pay $9.99'}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
