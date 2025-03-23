"use client"
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { 
  Home, 
  Search, 
  LibraryIcon, 
  Settings, 
  LogOut, 
  Shuffle, 
  SkipBack, 
  Play, 
  SkipForward, 
  Repeat, 
  Volume2, 
  Heart, 
  Plus, 
  MoreHorizontal 
} from 'lucide-react';
import { NextPage } from 'next';

// Types
type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  imageUrl: string;
  duration: string;
  isNFT: boolean;
};

type Album = {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  isNFT: boolean;
};

type Playlist = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  songCount: number;
};

type Artist = {
  id: string;
  name: string;
  imageUrl: string;
  followers: string;
};

const Library: NextPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentSong, setCurrentSong] = useState<Song>({
    id: '1',
    title: 'Excuses',
    artist: 'AP Dhillon, Gurinder Gill',
    album: 'Hidden Gems',
    imageUrl: '/album-covers/excuses.jpg',
    duration: '2:56',
    isNFT: true
  });
  
  // Sample data with Hindi and Punjabi songs
  const recentlyPlayed: Song[] = [
    {
      id: '1',
      title: 'Excuses',
      artist: 'AP Dhillon, Gurinder Gill',
      album: 'Hidden Gems',
      imageUrl: 'https://c.saavncdn.com/890/Excuses-English-2021-20210930112054-500x500.jpg',
      duration: '2:56',
      isNFT: true
    },
    {
      id: '2',
      title: 'Raataan Lambiyan',
      artist: 'Jubin Nautiyal, Asees Kaur',
      album: 'Shershaah',
      imageUrl: 'https://c.saavncdn.com/222/Raataan-Lambiyan-From-Shershaah--Hindi-2021-20210729181107-500x500.jpg',
      duration: '3:50',
      isNFT: false
    },
    {
      id: '3',
      title: 'Brown Munde',
      artist: 'AP Dhillon, Gurinder Gill, Proof',
      album: 'Brown Munde',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273d9a129c4a656a55afff2ca02',
      duration: '4:15',
      isNFT: true
    },
    {
      id: '4',
      title: 'Kesariya',
      artist: 'Arijit Singh',
      album: 'Brahmastra',
      imageUrl: 'https://c.saavncdn.com/191/Kesariya-From-Brahmastra-Hindi-2022-20220717092820-500x500.jpg',
      duration: '4:28',
      isNFT: true
    },
  ];
  
  const topAlbums: Album[] = [
    {
      id: '1',
      title: 'Hidden Gems',
      artist: 'AP Dhillon',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273852d4ace5ba8cf082b045c38',
      isNFT: true
    },
    {
      id: '2',
      title: 'Shershaah',
      artist: 'Various Artists',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/32/Shershaah_soundtrack.jpg',
      isNFT: false
    },
    {
      id: '3',
      title: 'Kabir Singh',
      artist: 'Sachet-Parampara, Arijit Singh',
      imageUrl: 'https://c.saavncdn.com/807/Kabir-Singh-Hindi-2019-20240131131003-500x500.jpg',
      isNFT: true
    },
    {
      id: '4',
      title: 'Diljit Dosanjh Hits',
      artist: 'Diljit Dosanjh',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2737bf7ee8f80d6b528499cfb2b',
      isNFT: true
    },
    {
      id: '5',
      title: 'Not by Force',
      artist: 'Karan Aujla',
      imageUrl: 'https://dailymusicroll.s3.us-west-2.amazonaws.com/wp-content/uploads/2024/08/12163658/Uncommon-Facts-About-The-Famous-Punjabi-Singer-Karan-Aujla-e1723460955815-1024x635.webp',
      isNFT: false
    }
  ];
  
  const playlists: Playlist[] = [
    {
      id: '1',
      title: 'Punjabi Party Hits',
      description: 'Top Bhangra and party songs',
      imageUrl: 'https://i.scdn.co/image/ab67706f00000002296c17a0211e5380edfa954d',
      songCount: 24
    },
    {
      id: '2',
      title: 'Bollywood Romance',
      description: 'Romantic Hindi hits',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273837703447a37700546b74b6c',
      songCount: 15
    },
    {
      id: '3',
      title: 'Desi Workout',
      description: 'High energy beats for gym',
      imageUrl: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da843e0f6773ddad2e638fc0647d',
      songCount: 32
    },
    {
      id: '4',
      title: 'Sufi Classics',
      description: 'Soulful Sufi tracks',
      imageUrl: 'https://i.scdn.co/image/ab67616d00001e02129264d32b55f7bf0fd97032',
      songCount: 28
    }
  ];
  
  const artists: Artist[] = [
    {
      id: '1',
      name: 'Arijit Singh',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb5ba2d75eb08a2d672f9b69b7',
      followers: '3.2M'
    },
    {
      id: '2',
      name: 'AP Dhillon',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebfb505b37709fa86cfd8f55b3',
      followers: '1.8M'
    },
    {
      id: '3',
      name: 'Diljit Dosanjh',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebfc043bea91ac91c222d235c9',
      followers: '2.5M'
    },
    {
      id: '4',
      name: 'Aditya Rikhari',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb482c8b15eab378fdebc5e05e',
      followers: '1.1M'
    },
    {
      id: '5',
      name: 'Honey Singh',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebbc7e4fffd515b47ff1ebbc1f',
      followers: '3.6M'
    },
    {
      id: '6',
      name: 'Karan Aujla',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2a354a64d9c5c602db0be2a4',
      followers: '1.2M'
    }
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen flex">
      <Head>
        <title>Library | Rhythmix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar */}
    
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Library</h1>
            
            
          </div>
          
          {/* Search Bar */}
          <div className="bg-[#222222] rounded-lg flex items-center px-4 py-3 mb-8 max-w-xl">
            <Search size={20} className="text-gray-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search in your library..."
              className="bg-transparent border-none outline-none text-white w-full"
            />
          </div>
          
          {/* Filters */}
          
          
          {/* Recently Played Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Recently Played</h2>
              
            </div>
            
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 border-b border-[#333333]">
                  <th className="font-normal text-left py-3 w-8">#</th>
                  <th className="font-normal text-left py-3">Title</th>
                  <th className="font-normal text-left py-3">Album</th>
                  <th className="font-normal text-left py-3">Duration</th>
                  <th className="font-normal text-right py-3"></th>
                </tr>
              </thead>
              <tbody>
                {recentlyPlayed.map((song, index) => (
                  <tr key={song.id} className="border-b border-[#222222] hover:bg-[#1a1a1a]">
                    <td className="py-3 text-gray-400">{index + 1}</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 mr-4">
                          <Image src={song.imageUrl} alt={song.title} width={40} height={40} className="rounded" />
                          {song.isNFT && (
                            <div className="absolute top-0 right-0 bg-[#7c3aed] text-xs px-1 rounded">NFT</div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{song.title}</h4>
                          <p className="text-sm text-gray-400">{song.artist}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-gray-400">{song.album}</td>
                    <td className="py-3 text-gray-400">{song.duration}</td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-4">
                        <button className="text-gray-400 hover:text-[#7c3aed]">
                          <Heart size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-[#7c3aed]">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          
          {/* Albums Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Your Albums</h2>
             
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {topAlbums.map(album => (
                <div key={album.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:bg-[#222222] transition-transform hover:-translate-y-1">
                  <div className="relative">
                    <div className="aspect-square relative">
                      <Image src={album.imageUrl} alt={album.title} layout="fill" objectFit="cover" />
                    </div>
                    {album.isNFT && (
                      <div className="absolute top-2 right-2 bg-[#7c3aed] bg-opacity-80 text-white text-xs px-2 py-1 rounded">NFT</div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="bg-[#7c3aed] bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center">
                        <Play size={24} fill="white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium truncate">{album.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{album.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Playlists Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Your Playlists</h2>
              
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {playlists.map(playlist => (
                <div key={playlist.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:bg-[#222222] transition-transform hover:-translate-y-1">
                  <div className="relative">
                    <div className="aspect-square relative">
                      <Image src={playlist.imageUrl} alt={playlist.title} layout="fill" objectFit="cover" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="bg-[#7c3aed] bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center">
                        <Play size={24} fill="white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium truncate">{playlist.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{playlist.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{playlist.songCount} songs</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Artists Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Artists You Follow</h2>
              <a href="#" className="text-[#7c3aed] text-sm hover:underline">View All</a>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {artists.map(artist => (
                <div key={artist.id} className="text-center">
                  <div className="relative mx-auto w-full aspect-square mb-3">
                    <div className="w-full h-full rounded-full relative overflow-hidden">
                      <Image src={artist.imageUrl} alt={artist.name} layout="fill" objectFit="cover" />
                    </div>
                  </div>
                  <h3 className="font-medium truncate">{artist.name}</h3>
                  <p className="text-sm text-gray-400">{artist.followers} followers</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      {/* Now Playing Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-[#222222] py-3 px-5 flex items-center">
        {/* Current Song Info */}
        <div className="flex items-center w-1/4">
          <div className="w-12 h-12 relative rounded overflow-hidden mr-3">
            <Image src={currentSong.imageUrl} alt={currentSong.title} layout="fill" objectFit="cover" />
          </div>
          <div>
            <h4 className="font-medium text-sm">{currentSong.title}</h4>
            <p className="text-xs text-gray-400">{currentSong.artist}</p>
          </div>
          <button className="ml-4 text-gray-400 hover:text-[#7c3aed]">
            <Heart size={16} />
          </button>
        </div>
        
        {/* Player Controls */}
        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center gap-5 mb-2">
            <button className="text-gray-400 hover:text-white">
              <Shuffle size={18} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <SkipBack size={22} />
            </button>
            <button className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
              <Play size={16} fill="black" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <SkipForward size={22} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Repeat size={18} />
            </button>
          </div>
          
          <div className="flex items-center w-full max-w-lg gap-2">
            <span className="text-xs text-gray-400">0:00</span>
            <div className="flex-1 h-1 bg-[#333333] rounded-full relative">
              <div className="absolute left-0 top-0 h-full w-0 bg-[#7c3aed] rounded-full"></div>
            </div>
            <span className="text-xs text-gray-400">0:00</span>
          </div>
        </div>
        
        {/* Volume Control */}
        <div className="w-1/4 flex justify-end items-center gap-2">
          <Volume2 size={18} className="text-gray-400" />
          <div className="w-24 h-1 bg-[#333333] rounded-full relative">
            <div className="absolute left-0 top-0 h-full w-1/2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;