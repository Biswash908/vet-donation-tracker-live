'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Case, Donation } from '../lib/database';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, ArrowLeft, Phone, Mail, ExternalLink, Instagram } from 'lucide-react';

interface PetDetailProps {
  pet: Case;
  donations: Donation[];
  onBack: () => void;
}

export default function PetDetail({ pet, donations, onBack }: PetDetailProps) {
  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
  const remaining = pet.estimated_cost - totalDonated;
  const progressPercentage = Math.round((totalDonated / pet.estimated_cost) * 100);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      active: 'bg-slate-100 text-slate-800',
      partially_funded: 'bg-blue-100 text-blue-800',
      funded: 'bg-green-100 text-green-800',
      closed: 'bg-slate-100 text-slate-800'
    };
    return colors[status] || colors.active;
  };

  const handleDonate = () => {
    if (pet.payment_link) {
      window.open(pet.payment_link, '_blank');
    } else {
      alert('Payment link not available for this case');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 bg-transparent"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl text-slate-900">VET DONATION TRACKER</h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Pet Details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - GoFundMe Style */}
      <div className="lg:hidden">
        {/* Pet Photo */}
        {pet.pet_photo && (
          <div className="w-full">
            <img
              src={pet.pet_photo || "/placeholder.svg"}
              alt={pet.animal_name}
              className="w-full h-80 object-cover"
            />
          </div>
        )}

        <div className="px-6 py-6 space-y-6">
          {/* Title and Badge */}
          <div>
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-2xl text-slate-900">{pet.animal_name}</h1>
              <Badge variant="outline" className={getStatusColor(pet.status)}>
                {pet.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          {/* Simple Progress Bar - GoFundMe Style */}
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="mb-4">
              <div className="text-3xl text-slate-900 mb-1">
                ${totalDonated.toFixed(2)}
              </div>
              <div className="text-sm text-slate-600">
                raised of ${pet.estimated_cost.toFixed(2)} goal
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>

            {/* Donate Button */}
            <Button
              onClick={handleDonate}
              className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg flex items-center justify-center gap-2"
            >
              <Heart className="size-5" />
              Donate Now
            </Button>
          </div>

          {/* Medical Condition */}
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h2 className="text-xl mb-3 text-slate-900">Medical Condition</h2>
            <p className="text-slate-700 leading-relaxed">{pet.medical_condition}</p>
          </div>

          {/* Pet Story */}
          {pet.pet_story && (
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h2 className="text-xl mb-3 text-slate-900">Story</h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {pet.pet_story}
              </p>
            </div>
          )}

          {/* Invoice Information */}
          {pet.invoice_file && (
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h2 className="text-xl mb-3 text-slate-900">Veterinary Invoice</h2>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
                onClick={() => window.open(pet.invoice_file, '_blank')}
              >
                <ExternalLink className="size-4" />
                View Invoice Document
              </Button>
            </div>
          )}

          {/* Recent Donations */}
          {donations.length > 0 && (
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h2 className="text-xl mb-3 text-slate-900">Donations</h2>
              <p className="text-sm text-slate-600 mb-4">{donations.length} donations</p>
              <div className="space-y-3">
                {donations
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                  .map((donation) => (
                    <div
                      key={donation.id}
                      className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {donation.donor_name || 'Anonymous'}
                        </p>
                        <p className="text-sm text-slate-600">
                          {new Date(donation.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className="text-lg text-slate-900 font-semibold">
                        ${donation.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout - Original Two Column */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Appears first on mobile */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pet Header Card */}
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-3xl mb-2">{pet.animal_name}</CardTitle>
                    </div>
                    <Badge variant="outline" className={getStatusColor(pet.status)}>
                      {pet.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  {/* Pet Photo */}
                  {pet.pet_photo && (
                    <div className="rounded-lg overflow-hidden mb-4">
                      <img
                        src={pet.pet_photo || "/placeholder.svg"}
                        alt={pet.animal_name}
                        className="w-full h-96 object-cover"
                      />
                    </div>
                  )}
                </CardHeader>
              </Card>

              {/* Medical Condition */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Medical Condition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{pet.medical_condition}</p>
                </CardContent>
              </Card>

              {/* Pet Story */}
              {pet.pet_story && (
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Pet's Story</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                      {pet.pet_story}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Invoice Information */}
              {pet.invoice_file && (
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Veterinary Invoice</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 bg-transparent"
                      onClick={() => window.open(pet.invoice_file, '_blank')}
                    >
                      <ExternalLink className="size-4" />
                      View Invoice Document
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Recent Donations */}
              {donations.length > 0 && (
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Recent Donations</CardTitle>
                    <CardDescription>{donations.length} generous donors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {donations
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .map((donation) => (
                          <div
                            key={donation.id}
                            className="flex justify-between items-center p-4 bg-slate-50 rounded-lg"
                          >
                            <div>
                              <p className="font-semibold text-slate-900">
                                {donation.donor_name || 'Anonymous Donor'}
                              </p>
                              <p className="text-sm text-slate-600">
                                {new Date(donation.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                            <span className="text-xl text-green-700 font-semibold">
                              ${donation.amount.toFixed(2)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar - Appears after main content on mobile */}
            <div className="lg:col-start-3 space-y-6">
              <div className="lg:sticky lg:top-6 space-y-6">
                {/* Funding Progress */}
                <Card className="bg-white border-blue-200">
                  <CardHeader>
                    <CardTitle>Funding Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">Progress</span>
                        <span className="text-sm text-slate-900">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all"
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Amounts */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Total Needed</span>
                        <span className="text-xl text-slate-900">
                          ${pet.estimated_cost.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Raised So Far</span>
                        <span className="text-xl text-green-700">
                          ${totalDonated.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                        <span className="text-sm text-slate-600">Still Needed</span>
                        <span className="text-2xl text-blue-700 font-semibold">
                          ${remaining.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Donate Button */}
                    <Button
                      onClick={handleDonate}
                      className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg flex items-center justify-center gap-2"
                    >
                      <Heart className="size-5" />
                      Donate Now
                    </Button>

                    <p className="text-xs text-center text-slate-600">
                      You'll be redirected to the veterinary clinic's secure payment page
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
