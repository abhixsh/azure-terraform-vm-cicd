import React, { useState } from "react";

export default function TerraformLandingPage() {
  const [activeTab, setActiveTab] = useState("plan");
  const [code, setCode] = useState(`# Define AWS provider
provider "aws" {
  region = "us-west-2"
}

# Create a VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "terraform-vpc"
  }
}`);
  const [output, setOutput] = useState("");

  const simulateValidation = () => {
    setOutput("Success! Configuration is valid.");
    setTimeout(() => {
      setOutput("");
    }, 3000);
  };

  const renderWorkflowContent = () => {
    switch(activeTab) {
      case "plan":
        return (
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <pre className="text-green-400 overflow-x-auto">
              <code>
                {`$ terraform plan

Terraform will perform the following actions:

  # aws_instance.example will be created
  + resource "aws_instance" "example" {
      + ami                          = "ami-0c55b159cbfafe1f0"
      + instance_type                = "t2.micro"
      + tags                         = {
          + "Name" = "terraform-example"
        }
      # (... additional attributes ...)
    }

Plan: 1 to add, 0 to change, 0 to destroy.`}
              </code>
            </pre>
          </div>
        );
      case "apply":
        return (
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <pre className="text-blue-400 overflow-x-auto">
              <code>
                {`$ terraform apply

Terraform will perform the following actions:

  # aws_instance.example will be created
  + resource "aws_instance" "example" {
      # (... attributes ...)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

aws_instance.example: Creating...
aws_instance.example: Creation complete after 40s

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.`}
              </code>
            </pre>
          </div>
        );
      case "destroy":
        return (
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <pre className="text-red-400 overflow-x-auto">
              <code>
                {`$ terraform destroy

Terraform will perform the following actions:

  # aws_instance.example will be destroyed
  - resource "aws_instance" "example" {
      # (... attributes ...)
    }

Plan: 0 to add, 0 to change, 1 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

aws_instance.example: Destroying...
aws_instance.example: Destruction complete after 32s

Destroy complete! Resources: 1 destroyed.`}
              </code>
            </pre>
          </div>
        );
      default:
        return null;
    }
  };

  const benefits = [
    {
      title: "Infrastructure as Code",
      description: "Define infrastructure using declarative configuration files that describe the desired state.",
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "Multi-Cloud Deployment",
      description: "Manage infrastructure across multiple cloud providers with a single workflow.",
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
    {
      title: "State Management",
      description: "Track resource state to ensure infrastructure changes are predictable and controlled.",
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      title: "Execution Plans",
      description: "Preview changes before applying them to understand exactly what Terraform will do.",
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-indigo-600" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M38.17 18.66L25.83 12v13.32l12.34 6.66V18.66z" />
              <path d="M25.83 12L13.5 18.66v13.32l12.33-6.66V12z" />
              <path d="M38.17 31.98l-12.34 6.66v13.32l12.34-6.66V31.98z" />
              <path d="M25.83 38.64L13.5 31.98v13.32l12.33 6.66V38.64z" />
              <path d="M50.5 18.66L38.17 12v13.32l12.33 6.66V18.66z" />
            </svg>
            <span className="text-xl font-bold text-gray-800">Terraform</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
            <a href="#workflow" className="text-gray-600 hover:text-indigo-600 transition">Workflow</a>
            <a href="#try-it" className="text-gray-600 hover:text-indigo-600 transition">Try It</a>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Infrastructure as Code Made <span className="text-teal-300">Simple</span>
              </h1>
              <p className="text-xl mb-8">
                Define, provision, and manage infrastructure with declarative configuration files.
                Experience the power of Terraform with our interactive tools.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                  Get Started
                </button>
                <button className="bg-transparent hover:bg-white/10 border border-white text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                  Interactive Demo
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-700">
                <pre className="text-teal-300 overflow-x-auto">
                  <code>
                    {`# Define a Terraform configuration
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "terraform-example"
  }
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Terraform</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{benefit.title}</h3>
                <p className="text-gray-600 text-center">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div id="workflow" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Experience the Terraform Workflow</h2>
          
          <div className="flex flex-col space-y-8">
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setActiveTab("plan")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "plan" 
                    ? "bg-indigo-600 text-white" 
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                Plan
              </button>
              <button 
                onClick={() => setActiveTab("apply")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "apply" 
                    ? "bg-indigo-600 text-white" 
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                Apply
              </button>
              <button 
                onClick={() => setActiveTab("destroy")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "destroy" 
                    ? "bg-indigo-600 text-white" 
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                Destroy
              </button>
            </div>
            
            <div className="w-full">
              {renderWorkflowContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Try It Section */}
      <div id="try-it" className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Try Terraform Configuration</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Write Your Configuration</h3>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <textarea
                  className="w-full h-64 bg-gray-800 text-green-400 font-mono p-2 focus:outline-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <button 
                  onClick={simulateValidation}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                >
                  Validate Configuration
                </button>
                {output && (
                  <div className="mt-4 p-3 bg-green-900 text-green-300 rounded-lg">
                    {output}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Learn Terraform Syntax</h3>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <ul className="space-y-4">
                  <li>
                    <span className="text-purple-400 font-semibold">provider</span>
                    <p className="text-gray-300 mt-1">Configures a specific infrastructure provider (AWS, Azure, GCP).</p>
                  </li>
                  <li>
                    <span className="text-purple-400 font-semibold">resource</span>
                    <p className="text-gray-300 mt-1">Defines an infrastructure object like a virtual network, compute instance, or DNS record.</p>
                  </li>
                  <li>
                    <span className="text-purple-400 font-semibold">variable</span>
                    <p className="text-gray-300 mt-1">Defines input variables to make your configuration more dynamic.</p>
                  </li>
                  <li>
                    <span className="text-purple-400 font-semibold">output</span>
                    <p className="text-gray-300 mt-1">Defines values that will be highlighted after applying the configuration.</p>
                  </li>
                  <li>
                    <span className="text-purple-400 font-semibold">module</span>
                    <p className="text-gray-300 mt-1">Packages and reuses configurations for multiple resources.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Infrastructure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of organizations using Terraform to automate their infrastructure deployment and management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-indigo-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
              Get Started
            </button>
            <button className="bg-transparent hover:bg-white/10 border border-white text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Documentation
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-indigo-400" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M38.17 18.66L25.83 12v13.32l12.34 6.66V18.66z" />
                  <path d="M25.83 12L13.5 18.66v13.32l12.33-6.66V12z" />
                  <path d="M38.17 31.98l-12.34 6.66v13.32l12.34-6.66V31.98z" />
                  <path d="M25.83 38.64L13.5 31.98v13.32l12.33 6.66V38.64z" />
                  <path d="M50.5 18.66L38.17 12v13.32l12.33 6.66V18.66z" />
                </svg>
                <span className="text-lg font-bold">Terraform</span>
              </div>
              <p className="mt-2 text-gray-400">Infrastructure as Code</p>
            </div>
            <div className="flex space-x-8">
              <div>
                <h3 className="font-semibold mb-2">Product</h3>
                <ul className="space-y-1 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Features</a></li>
                  <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition">Enterprise</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Resources</h3>
                <ul className="space-y-1 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition">Community</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Company</h3>
                <ul className="space-y-1 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">About</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Terraform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
