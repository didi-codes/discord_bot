import os

import discord 
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
GUILD = os.getenv('DISCORD_GUILD')

intents = discord.Intents.default()
intents.message_content = True
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    guild = discord.utils.get(client.guilds, name=GUILD)

    print(f'{client.user} has connected to the following guild:\n'
          f'{guild.name}(id:{guild.id})')
    
    members = '\n -'.join([member.name for member in guild.members])
    print(f'Guild Members: \n - {members}')

@client.event
async def on_member_join(member):
    await member.create_dm()
    await member.dm.channel.send(
        f'Welcome {member.name}, to the Emerald Woodland Realm'
    )

client.run(TOKEN)