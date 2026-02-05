import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertCircle } from 'lucide-react';

interface DonatePageProps {
  navigateTo: (page: 'home' | 'donate' | 'admin-login' | 'admin-dashboard') => void;
}

export default function DonatePage({ navigateTo }: DonatePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Make a Donation</h1>
          <p className="text-slate-600 text-lg">
            Help us provide essential veterinary care to rescue animals in need.
          </p>
        </div>

        {/* How Your Donation Helps Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How Your Donation Helps</CardTitle>
            <CardDescription>
              Your contribution directly funds veterinary care for rescue animals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-700">
              When you donate, our team allocates your funds to cover pending veterinary bills. 
              We track every donation transparently, and you can see the progress on our homepage.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">
                After making your donation, check back on the homepage to see how your contribution 
                is helping us reach our fundraising goals!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Available Donation Methods</CardTitle>
            <CardDescription>
              Choose the payment method that works best for you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Venmo */}
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg mb-2">Venmo</h3>
              <p className="text-slate-700 mb-2">
                Send your donation to:{' '}
                <span className="font-semibold text-blue-600">@AnimalRescueOrg</span>
              </p>
              <p className="text-sm text-slate-600">
                Please include "Vet Care" in the note so we can properly track your donation.
              </p>
            </div>

            {/* PayPal */}
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg mb-2">PayPal</h3>
              <p className="text-slate-700 mb-2">
                Send to:{' '}
                <span className="font-semibold text-blue-600">donations@animalrescue.org</span>
              </p>
              <p className="text-sm text-slate-600">
                Mark as "Friends & Family" to avoid fees, or choose "Goods & Services" if you prefer.
              </p>
            </div>

            {/* Zelle */}
            <div className="pb-2">
              <h3 className="text-lg mb-2">Zelle</h3>
              <p className="text-slate-700 mb-2">
                Send to:{' '}
                <span className="font-semibold text-blue-600">donations@animalrescue.org</span>
              </p>
              <p className="text-sm text-slate-600">
                Zelle transfers are instant and have no fees.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Thank You Card */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <h3 className="text-lg text-green-900 mb-3">Thank You for Your Generosity! 🐾</h3>
            <p className="text-green-900 mb-4">
              After you've made your donation using one of the methods above, our admin team will 
              add it to our tracking system. You'll be able to see the updated progress on our homepage.
            </p>
            <p className="text-green-900">
              Your kindness makes a real difference in the lives of animals who need it most.
            </p>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center">
          <Button 
            onClick={() => navigateTo('home')}
            variant="outline"
            size="lg"
          >
            Back to Summary
          </Button>
        </div>
      </div>
    </div>
  );
}
